// ============================================
// ADMIN AUTH HELPER - src/lib/adminAuth.ts
// ============================================

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_KEY // Server-side only
);

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Login admin with email & password
 */
export async function loginAdmin(email: string, password: string) {
  try {
    // Get admin user
    const { data: admin, error: fetchError } = await supabase
      .from('admin_users')
      .select('id, email, password_hash, full_name')
      .eq('email', email.toLowerCase())
      .single();

    if (fetchError || !admin) {
      return {
        success: false,
        error: 'Admin account not found'
      };
    }

    // Verify password
    const passwordValid = await verifyPassword(password, admin.password_hash);
    if (!passwordValid) {
      return {
        success: false,
        error: 'Invalid password'
      };
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // Create session token (simple JWT-like structure)
    const sessionToken = Buffer.from(
      JSON.stringify({
        admin_id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      })
    ).toString('base64');

    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name
      },
      sessionToken
    };
  } catch (err) {
    console.error('Login error:', err);
    return {
      success: false,
      error: 'Login failed. Please try again.'
    };
  }
}

/**
 * Create a scheduled post
 */
export async function createScheduledPost(
  adminId: string,
  postData: {
    title: string;
    description: string;
    body: string;
    category: string;
    calculator_tag: string;
    read_time: number;
    featured: boolean;
    scheduled_date: string; // YYYY-MM-DD
    scheduled_time?: string; // HH:MM:SS, defaults to 08:00:00
    og_image?: string;
  }
) {
  try {
    const { data, error } = await supabase
      .from('scheduled_posts')
      .insert({
        admin_id: adminId,
        title: postData.title,
        description: postData.description,
        body: postData.body,
        category: postData.category,
        calculator_tag: postData.calculator_tag,
        read_time: postData.read_time,
        featured: postData.featured,
        scheduled_date: postData.scheduled_date,
        scheduled_time: postData.scheduled_time || '08:00:00',
        og_image: postData.og_image,
        status: 'scheduled'
      })
      .select();

    if (error) throw error;

    return {
      success: true,
      post: data[0]
    };
  } catch (err) {
    console.error('Create scheduled post error:', err);
    return {
      success: false,
      error: 'Failed to create scheduled post'
    };
  }
}

/**
 * Get all scheduled posts for admin
 */
export async function getScheduledPostsForAdmin(adminId: string, status?: string) {
  try {
    let query = supabase
      .from('scheduled_posts')
      .select('*')
      .eq('admin_id', adminId)
      .order('scheduled_date', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      success: true,
      posts: data || []
    };
  } catch (err) {
    console.error('Get scheduled posts error:', err);
    return {
      success: false,
      error: 'Failed to fetch scheduled posts',
      posts: []
    };
  }
}

/**
 * Update scheduled post
 */
export async function updateScheduledPost(
  postId: string,
  adminId: string,
  updates: Partial<any>
) {
  try {
    // Verify ownership
    const { data: post, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('admin_id')
      .eq('id', postId)
      .single();

    if (fetchError || post.admin_id !== adminId) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    const { data, error } = await supabase
      .from('scheduled_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', postId)
      .select();

    if (error) throw error;

    return {
      success: true,
      post: data[0]
    };
  } catch (err) {
    console.error('Update scheduled post error:', err);
    return {
      success: false,
      error: 'Failed to update scheduled post'
    };
  }
}

/**
 * Delete scheduled post
 */
export async function deleteScheduledPost(postId: string, adminId: string) {
  try {
    // Verify ownership
    const { data: post, error: fetchError } = await supabase
      .from('scheduled_posts')
      .select('admin_id')
      .eq('id', postId)
      .single();

    if (fetchError || post.admin_id !== adminId) {
      return {
        success: false,
        error: 'Unauthorized'
      };
    }

    const { error } = await supabase
      .from('scheduled_posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;

    return {
      success: true
    };
  } catch (err) {
    console.error('Delete scheduled post error:', err);
    return {
      success: false,
      error: 'Failed to delete scheduled post'
    };
  }
}
