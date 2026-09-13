// ============================================
// GA4 + SUPABASE EVENT TRACKING SCRIPT
// Add to the <head> of every page
// ============================================

// 1. Google Analytics 4 (Global Site Tag)
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_path': window.location.pathname,
    'send_page_view': true,
    'anonymize_ip': true,
  });
</script>

// 2. CUSTOM GA4 EVENTS FOR CALCULATORS
// Add to each calculator page (mortgage.html, solar.html, etc.)

<script>
// Track calculator views
gtag('event', 'calculator_view', {
  'calculator_type': 'mortgage',  // Change per page
  'page_title': document.title,
  'referrer': document.referrer || 'direct'
});

// Track input changes (debounced to avoid spam)
let changeTimeout;
function trackCalculatorChange(fieldName, fieldValue) {
  clearTimeout(changeTimeout);
  changeTimeout = setTimeout(() => {
    gtag('event', 'calculator_change', {
      'calculator_type': 'mortgage',  // Change per page
      'field_name': fieldName,
      'field_value_type': typeof fieldValue, // numeric, text, boolean
    });
  }, 2000); // Debounce: only fire after 2s of no changes
}

// Track result views (when user scrolls to summary)
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target.id === 'summarySheet') {
      gtag('event', 'calculator_result_view', {
        'calculator_type': 'mortgage',
        'result_visible_time': new Date().toISOString()
      });
    }
  });
});

const summarySheet = document.getElementById('summarySheet');
if (summarySheet) {
  intersectionObserver.observe(summarySheet);
}

// Track PDF downloads
document.getElementById('pdfBtn')?.addEventListener('click', () => {
  gtag('event', 'pdf_download', {
    'calculator_type': 'mortgage',
    'timestamp': new Date().toISOString()
  });
});

// Track country selection (multi-country use)
document.getElementById('countrySelect')?.addEventListener('change', (e) => {
  gtag('event', 'country_selected', {
    'calculator_type': 'mortgage',
    'selected_country': e.target.value,
  });
});

// Track reset button
document.getElementById('resetBtn')?.addEventListener('click', () => {
  gtag('event', 'calculator_reset', {
    'calculator_type': 'mortgage',
  });
});
</script>

// 3. SUPABASE EVENT LOGGING (Optional: Server-side tracking)
// Create a `events` table in Supabase to store detailed analytics

/*
SQL to create events table:

CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL, -- 'calculator_view', 'calculator_change', 'pdf_download', etc.
  calculator_type TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  metadata JSONB, -- Store extra context
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_calculator ON events(calculator_type);
CREATE INDEX idx_events_created ON events(created_at DESC);
*/

// Client-side JavaScript to log events to Supabase:
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

async function trackSupabaseEvent(eventType, calculatorType, metadata = {}) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const sessionId = sessionStorage.getItem('session_id') || crypto.randomUUID();
    sessionStorage.setItem('session_id', sessionId);
    
    const { error } = await supabase
      .from('events')
      .insert({
        event_type: eventType,
        calculator_type: calculatorType,
        user_id: user?.id || null,
        session_id: sessionId,
        metadata: metadata,
      });
    
    if (error) console.warn('Supabase event logging failed:', error);
  } catch (e) {
    console.warn('Error logging event:', e);
  }
}

// Usage: Call this whenever you want to track something
// trackSupabaseEvent('calculator_view', 'mortgage', { country: 'NG' });

// ============================================
// GA4 DASHBOARD GOALS (Set up in GA4 Admin)
// ============================================
/*
Goal 1: Calculator Engagement
- Name: "Calculator Engagement"
- Event: calculator_result_view
- Description: User viewed the summary results of a calculator

Goal 2: Content Conversion (PDF)
- Name: "PDF Download"
- Event: pdf_download
- Description: User downloaded a PDF report

Goal 3: Multi-Country Usage
- Name: "Multi-Country Users"
- Event: country_selected
- Description: User selected a country other than default

Goal 4: Blog Traffic
- Name: "Blog Post View"
- Event: page_view (filter by path /blog/*)

Goal 5: Referral Traffic
- Name: "External Referral"
- Event: page_view (filter by referrer = external)
*/

// ============================================
// ANALYTICS QUERIES FOR SUPABASE
// ============================================

// Query 1: Most Popular Calculators (last 30 days)
/*
SELECT 
  calculator_type, 
  COUNT(*) as views
FROM events
WHERE event_type = 'calculator_view'
  AND created_at > NOW() - INTERVAL '30 days'
GROUP BY calculator_type
ORDER BY views DESC;
*/

// Query 2: Average Session Duration by Calculator
/*
SELECT 
  s.calculator_type,
  AVG(EXTRACT(EPOCH FROM (s.last_event - s.first_event))) as avg_session_duration_seconds
FROM (
  SELECT 
    session_id,
    calculator_type,
    MIN(created_at) as first_event,
    MAX(created_at) as last_event
  FROM events
  WHERE created_at > NOW() - INTERVAL '30 days'
  GROUP BY session_id, calculator_type
) s
GROUP BY s.calculator_type;
*/

// Query 3: Conversion Funnel (View → Change → Result → PDF)
/*
SELECT 
  'View' as stage, COUNT(DISTINCT session_id) as count
FROM events WHERE event_type = 'calculator_view' AND created_at > NOW() - INTERVAL '30 days'
UNION ALL
SELECT 
  'Edit' as stage, COUNT(DISTINCT session_id)
FROM events WHERE event_type = 'calculator_change' AND created_at > NOW() - INTERVAL '30 days'
UNION ALL
SELECT 
  'View Result' as stage, COUNT(DISTINCT session_id)
FROM events WHERE event_type = 'calculator_result_view' AND created_at > NOW() - INTERVAL '30 days'
UNION ALL
SELECT 
  'Download PDF' as stage, COUNT(DISTINCT session_id)
FROM events WHERE event_type = 'pdf_download' AND created_at > NOW() - INTERVAL '30 days';
*/

// Query 4: Top Referring Sites (30 days)
/*
SELECT 
  metadata->>'referrer' as source,
  COUNT(*) as visits
FROM events
WHERE event_type = 'calculator_view'
  AND created_at > NOW() - INTERVAL '30 days'
  AND metadata->>'referrer' IS NOT NULL
GROUP BY metadata->>'referrer'
ORDER BY visits DESC
LIMIT 10;
*/

