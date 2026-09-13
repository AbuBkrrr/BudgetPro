// ============================================
// PDF GENERATORS FOR REMAINING CALCULATORS
// src/lib/pdfExport.ts (continued)
// ============================================

/**
 * Generate Business Calculator PDF
 */
export function generateBusinessPDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Key metrics
  pdf.addCallout('Total Capital Needed', pdf.formatCurrency(data.totalCapitalNeeded, config.currencySymbol), 'gold');
  pdf.addCallout('Break-Even Revenue', pdf.formatCurrency(data.breakEvenRevenue, config.currencySymbol) + '/month', 'gold');
  pdf.addCallout('Runway (Months)', `${data.runwayMonths}`, 'green');

  // Startup costs
  pdf.addSection('Startup Capital Requirements', [
    { label: 'Registration & Licenses', value: pdf.formatCurrency(data.registration, config.currencySymbol) },
    { label: 'Office/Retail Space (Fit-Out)', value: pdf.formatCurrency(data.fitOut, config.currencySymbol) },
    { label: 'Equipment & Machinery', value: pdf.formatCurrency(data.equipment, config.currencySymbol) },
    { label: 'Initial Inventory', value: pdf.formatCurrency(data.inventory, config.currencySymbol) },
    { label: 'Marketing & Branding', value: pdf.formatCurrency(data.marketing, config.currencySymbol) },
    { label: 'Legal & Professional Fees', value: pdf.formatCurrency(data.legalFees, config.currencySymbol) },
    { label: 'Subtotal (Fixed Assets)', value: pdf.formatCurrency(data.fixedAssets, config.currencySymbol), highlight: true }
  ]);

  // Operating expenses
  pdf.addSection('Monthly Operating Burn', [
    { label: 'Rent/Lease', value: pdf.formatCurrency(data.monthlyRent, config.currencySymbol) },
    { label: 'Salaries (Founder + Staff)', value: pdf.formatCurrency(data.monthlySalaries, config.currencySymbol) },
    { label: 'Utilities & Services', value: pdf.formatCurrency(data.monthlyUtilities, config.currencySymbol) },
    { label: 'Supplies & Materials', value: pdf.formatCurrency(data.monthlySupplies, config.currencySymbol) },
    { label: 'Marketing & Advertising', value: pdf.formatCurrency(data.monthlyMarketing, config.currencySymbol) },
    { label: 'Insurance & Legal', value: pdf.formatCurrency(data.monthlyInsurance, config.currencySymbol) },
    { label: 'Contingency (10%)', value: pdf.formatCurrency(data.monthlyContingency, config.currencySymbol) },
    { label: 'Total Monthly Burn', value: pdf.formatCurrency(data.monthlyBurn, config.currencySymbol), highlight: true }
  ]);

  // Runway calculation
  pdf.addSection('Runway Analysis', [
    { label: 'Fixed Assets', value: pdf.formatCurrency(data.fixedAssets, config.currencySymbol) },
    { label: 'Monthly Burn Rate', value: pdf.formatCurrency(data.monthlyBurn, config.currencySymbol) },
    { label: 'Desired Runway', value: `${data.runwayMonths} months` },
    { label: 'Burn Buffer Needed', value: pdf.formatCurrency(data.monthlyBurn * data.runwayMonths, config.currencySymbol) },
    { label: 'TOTAL CAPITAL NEEDED', value: pdf.formatCurrency(data.totalCapitalNeeded, config.currencySymbol), highlight: true }
  ]);

  // Revenue targets
  pdf.addSection('Break-Even Analysis', [
    { label: 'Monthly Operating Costs', value: pdf.formatCurrency(data.monthlyBurn, config.currencySymbol) },
    { label: 'Average Profit Margin', value: pdf.formatPercent(data.profitMargin) },
    { label: 'Break-Even Monthly Revenue', value: pdf.formatCurrency(data.breakEvenRevenue, config.currencySymbol), highlight: true },
    { label: 'Break-Even Annual Revenue', value: pdf.formatCurrency(data.breakEvenRevenue * 12, config.currencySymbol), highlight: true }
  ]);

  // Funding breakdown
  if (data.fundingSources) {
    pdf.addSection('Proposed Funding Mix', [
      ...(data.personalSavings ? [{ label: 'Personal Savings', value: pdf.formatCurrency(data.personalSavings, config.currencySymbol) }] : []),
      ...(data.investors ? [{ label: 'Angel Investors/Equity', value: pdf.formatCurrency(data.investors, config.currencySymbol) }] : []),
      ...(data.loans ? [{ label: 'Bank/Business Loans', value: pdf.formatCurrency(data.loans, config.currencySymbol) }] : []),
      ...(data.grants ? [{ label: 'Grants/Subsidies', value: pdf.formatCurrency(data.grants, config.currencySymbol) }] : [])
    ]);
  }

  // Timeline
  pdf.addTable(
    ['Milestone', 'Months', 'Action Items'],
    [
      ['Launch Prep', '0–2', 'Secure funding, lease space, hire staff'],
      ['Soft Launch', '2–3', 'Begin operations, test market, iterate'],
      ['Full Launch', '3–6', 'Full marketing push, scale operations'],
      ['Break-Even', `${Math.ceil(data.breakEvenMonths)}`, 'Monthly revenue equals monthly burn']
    ]
  );

  // Assumptions
  pdf.addAssumptions([
    { label: 'Profit Margin', value: pdf.formatPercent(data.profitMargin) },
    { label: 'Customer Acquisition Cost', value: pdf.formatCurrency(data.cacPerCustomer, config.currencySymbol) },
    { label: 'Churn Rate', value: pdf.formatPercent(data.churnRate) + '/month' },
    { label: 'Time to Market', value: `${data.timeToMarket} months` },
    { label: 'Scale Plan', value: data.scalePlan || 'Linear growth assumed' }
  ]);

  pdf.addFooter('Startup projections are estimates. Actual costs vary by region, industry, and execution. Consult mentors, investors, and accountants.');

  return pdf;
}

/**
 * Generate Construction Calculator PDF
 */
export function generateConstructionPDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Key metric
  pdf.addCallout('Total Build Cost', pdf.formatCurrency(data.totalBuildCost, config.currencySymbol), 'gold');
  pdf.addCallout('Cost per Sq. Meter', pdf.formatCurrency(data.costPerSqm, config.currencySymbol), 'gold');

  // Property details
  pdf.addSection('Property Details', [
    { label: 'Land Size', value: `${data.landSizeSqm} sq. meters` },
    { label: 'Usable Floor Area', value: `${data.floorAreaSqm} sq. meters` },
    { label: 'Number of Floors', value: `${data.floors}` },
    { label: 'Property Type', value: data.propertyType }
  ]);

  // Construction costs
  pdf.addSection('Major Construction Items', [
    { label: 'Foundation & Excavation', value: pdf.formatCurrency(data.foundation, config.currencySymbol) },
    { label: 'Structure (Frame & Walls)', value: pdf.formatCurrency(data.structure, config.currencySymbol) },
    { label: 'Roofing', value: pdf.formatCurrency(data.roofing, config.currencySymbol) },
    { label: 'Finishes (Paint, Flooring)', value: pdf.formatCurrency(data.finishes, config.currencySymbol) },
    { label: 'Plumbing & Sanitation', value: pdf.formatCurrency(data.plumbing, config.currencySymbol) },
    { label: 'Electrical Installation', value: pdf.formatCurrency(data.electrical, config.currencySymbol) },
    { label: 'HVAC/Climate Control', value: pdf.formatCurrency(data.hvac, config.currencySymbol) },
    { label: 'Doors, Windows & Fittings', value: pdf.formatCurrency(data.fittings, config.currencySymbol) },
    { label: 'Subtotal', value: pdf.formatCurrency(data.constructionSubtotal, config.currencySymbol), highlight: true }
  ]);

  // Additional costs
  pdf.addSection('Additional Costs', [
    { label: 'Site Preparation', value: pdf.formatCurrency(data.sitePrepration, config.currencySymbol) },
    { label: 'Landscaping & Outdoor Work', value: pdf.formatCurrency(data.landscaping, config.currencySymbol) },
    { label: 'Architectural & Engineering Fees', value: pdf.formatCurrency(data.architectFees, config.currencySymbol) },
    { label: 'Permits & Regulatory Approvals', value: pdf.formatCurrency(data.permits, config.currencySymbol) },
    { label: 'Builder Overhead (10%)', value: pdf.formatCurrency(data.overhead, config.currencySymbol) },
    { label: 'Contingency/Contingency (15%)', value: pdf.formatCurrency(data.contingency, config.currencySymbol) },
    { label: 'Subtotal (Soft Costs)', value: pdf.formatCurrency(data.softCosts, config.currencySymbol), highlight: true }
  ]);

  // Total & financing
  pdf.addSection('Total Project Cost', [
    { label: 'Construction Costs', value: pdf.formatCurrency(data.constructionSubtotal, config.currencySymbol) },
    { label: 'Soft Costs & Fees', value: pdf.formatCurrency(data.softCosts, config.currencySymbol) },
    { label: 'GRAND TOTAL', value: pdf.formatCurrency(data.totalBuildCost, config.currencySymbol), highlight: true }
  ]);

  // Timeline
  pdf.addSection('Project Timeline', [
    { label: 'Design & Approvals', value: `${data.designWeeks} weeks` },
    { label: 'Excavation & Foundation', value: `${data.foundationWeeks} weeks` },
    { label: 'Main Construction', value: `${data.constructionWeeks} weeks` },
    { label: 'Finishes', value: `${data.finishWeeks} weeks` },
    { label: 'Handover & Inspections', value: `${data.handoverWeeks} weeks` },
    { label: 'Total Duration', value: `${data.totalWeeks} weeks (${(data.totalWeeks / 4.33).toFixed(1)} months)` }
  ]);

  // Cost breakdown table
  pdf.addTable(
    ['Category', 'Amount', '% of Total'],
    [
      ['Construction', pdf.formatCurrency(data.constructionSubtotal, config.currencySymbol), pdf.formatPercent(data.constructionSubtotal / data.totalBuildCost)],
      ['Soft Costs', pdf.formatCurrency(data.softCosts, config.currencySymbol), pdf.formatPercent(data.softCosts / data.totalBuildCost)],
      ['Contingency', pdf.formatCurrency(data.contingency, config.currencySymbol), pdf.formatPercent(data.contingency / data.totalBuildCost)],
      ['TOTAL', pdf.formatCurrency(data.totalBuildCost, config.currencySymbol), '100%']
    ]
  );

  // Assumptions
  pdf.addAssumptions([
    { label: 'Cost per Sq. Meter', value: pdf.formatCurrency(data.costPerSqm, config.currencySymbol) },
    { label: 'Build Quality', value: data.buildQuality || 'Standard' },
    { label: 'Material Inflation', value: pdf.formatPercent(0.05) + '/year (estimate)' },
    { label: 'Labor Cost Basis', value: data.laborCostBasis || 'Local market rates' },
    { label: 'Project Delays', value: 'Not included; use contingency for risk' }
  ]);

  pdf.addFooter('Construction costs are estimates based on local market data. Actual costs depend on site conditions, material availability, and labor costs. Get multiple contractor quotes.');

  return pdf;
}

/**
 * Generate Income & Savings Calculator PDF
 */
export function generateIncomePDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Key metrics
  pdf.addCallout('Net Monthly Income', pdf.formatCurrency(data.netMonthlyIncome, config.currencySymbol), 'gold');
  pdf.addCallout('Financial Independence Number', pdf.formatCurrency(data.fiNumber, config.currencySymbol), 'green');

  // Income section
  pdf.addSection('Income Breakdown', [
    { label: 'Gross Monthly Income', value: pdf.formatCurrency(data.grossMonthlyIncome, config.currencySymbol) },
    { label: 'Total Taxes', value: `−${pdf.formatCurrency(data.totalTaxes, config.currencySymbol)}` },
    { label: 'Net Income (Take-Home)', value: pdf.formatCurrency(data.netMonthlyIncome, config.currencySymbol), highlight: true }
  ]);

  // 50/30/20 breakdown
  pdf.addSection('50/30/20 Budget Allocation', [
    { label: 'Needs (50%)', value: pdf.formatCurrency(data.needs, config.currencySymbol) + ` (${pdf.formatPercent(data.needsPercent)})` },
    { label: 'Wants (30%)', value: pdf.formatCurrency(data.wants, config.currencySymbol) + ` (${pdf.formatPercent(data.wantsPercent)})` },
    { label: 'Savings (20%)', value: pdf.formatCurrency(data.savings, config.currencySymbol) + ` (${pdf.formatPercent(data.savingsPercent)})` }
  ]);

  // Savings & investments
  pdf.addSection('Savings & Investment Strategy', [
    { label: 'Monthly Savings', value: pdf.formatCurrency(data.monthlySavings, config.currencySymbol) },
    { label: 'Annual Savings', value: pdf.formatCurrency(data.annualSavings, config.currencySymbol) },
    { label: 'Assumed Investment Return', value: pdf.formatPercent(data.investmentReturn) + '/year' },
    { label: 'Years to Financial Independence', value: `${data.yearsToFI} years`, highlight: true }
  ]);

  // FI calculation
  pdf.addSection('Financial Independence Analysis', [
    { label: 'Annual Expenses (50/30)', value: pdf.formatCurrency(data.annualExpenses, config.currencySymbol) },
    { label: 'Multiply by 25 (4% SWR)', value: 'Safe withdrawal rate' },
    { label: 'Financial Independence Number', value: pdf.formatCurrency(data.fiNumber, config.currencySymbol), highlight: true }
  ]);

  // Wealth projection
  pdf.addTable(
    ['Year', 'Annual Contribution', 'Investment Growth', 'Total Wealth'],
    [
      ['Year 1', pdf.formatCurrency(data.annualSavings, config.currencySymbol), pdf.formatCurrency(data.annualSavings * data.investmentReturn, config.currencySymbol), pdf.formatCurrency(data.annualSavings * (1 + data.investmentReturn), config.currencySymbol)],
      ['Year 5', pdf.formatCurrency(data.annualSavings * 5, config.currencySymbol), pdf.formatCurrency(data.wealthYear5 * data.investmentReturn, config.currencySymbol), pdf.formatCurrency(data.wealthYear5, config.currencySymbol)],
      ['Year 10', pdf.formatCurrency(data.annualSavings * 10, config.currencySymbol), pdf.formatCurrency(data.wealthYear10 * data.investmentReturn, config.currencySymbol), pdf.formatCurrency(data.wealthYear10, config.currencySymbol)],
      ['FI Target', '—', '—', pdf.formatCurrency(data.fiNumber, config.currencySymbol)]
    ]
  );

  // Assumptions
  pdf.addAssumptions([
    { label: 'Gross Income', value: pdf.formatCurrency(data.grossMonthlyIncome, config.currencySymbol) + '/month' },
    { label: 'Tax Rate', value: pdf.formatPercent(data.effectiveTaxRate) },
    { label: '50/30/20 Allocation', value: '50% needs, 30% wants, 20% savings' },
    { label: 'Investment Return', value: pdf.formatPercent(data.investmentReturn) + '/year (historical average ~7–10% stocks)' },
    { label: 'Safe Withdrawal Rate (SWR)', value: '4%/year (allows indefinite withdrawals)' }
  ]);

  pdf.addFooter('Financial independence timelines depend on income stability, expense control, and investment performance. Market returns are variable; consult a financial advisor.');

  return pdf;
}

/**
 * Generate Construction Calculator PDF
 */
export function generateConstructionPDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Key metric
  pdf.addCallout('Total Build Cost', pdf.formatCurrency(data.totalBuildCost, config.currencySymbol), 'gold');
  pdf.addCallout('Cost per Sq. Meter', pdf.formatCurrency(data.costPerSqm, config.currencySymbol), 'gold');

  // Property details
  pdf.addSection('Property Details', [
    { label: 'Land Size', value: `${data.landSizeSqm} sq. meters` },
    { label: 'Usable Floor Area', value: `${data.floorAreaSqm} sq. meters` },
    { label: 'Number of Floors', value: `${data.floors}` },
    { label: 'Property Type', value: data.propertyType }
  ]);

  // Construction costs
  pdf.addSection('Major Construction Items', [
    { label: 'Foundation & Excavation', value: pdf.formatCurrency(data.foundation, config.currencySymbol) },
    { label: 'Structure (Frame & Walls)', value: pdf.formatCurrency(data.structure, config.currencySymbol) },
    { label: 'Roofing', value: pdf.formatCurrency(data.roofing, config.currencySymbol) },
    { label: 'Finishes (Paint, Flooring)', value: pdf.formatCurrency(data.finishes, config.currencySymbol) },
    { label: 'Plumbing & Sanitation', value: pdf.formatCurrency(data.plumbing, config.currencySymbol) },
    { label: 'Electrical Installation', value: pdf.formatCurrency(data.electrical, config.currencySymbol) },
    { label: 'HVAC/Climate Control', value: pdf.formatCurrency(data.hvac, config.currencySymbol) },
    { label: 'Doors, Windows & Fittings', value: pdf.formatCurrency(data.fittings, config.currencySymbol) },
    { label: 'Subtotal', value: pdf.formatCurrency(data.constructionSubtotal, config.currencySymbol), highlight: true }
  ]);

  // Additional costs
  pdf.addSection('Additional Costs', [
    { label: 'Site Preparation', value: pdf.formatCurrency(data.sitePreparation, config.currencySymbol) },
    { label: 'Landscaping & Outdoor Work', value: pdf.formatCurrency(data.landscaping, config.currencySymbol) },
    { label: 'Architectural & Engineering Fees', value: pdf.formatCurrency(data.architectFees, config.currencySymbol) },
    { label: 'Permits & Regulatory Approvals', value: pdf.formatCurrency(data.permits, config.currencySymbol) },
    { label: 'Builder Overhead (10%)', value: pdf.formatCurrency(data.overhead, config.currencySymbol) },
    { label: 'Contingency (15%)', value: pdf.formatCurrency(data.contingency, config.currencySymbol) },
    { label: 'Subtotal (Soft Costs)', value: pdf.formatCurrency(data.softCosts, config.currencySymbol), highlight: true }
  ]);

  // Total & financing
  pdf.addSection('Total Project Cost', [
    { label: 'Construction Costs', value: pdf.formatCurrency(data.constructionSubtotal, config.currencySymbol) },
    { label: 'Soft Costs & Fees', value: pdf.formatCurrency(data.softCosts, config.currencySymbol) },
    { label: 'GRAND TOTAL', value: pdf.formatCurrency(data.totalBuildCost, config.currencySymbol), highlight: true }
  ]);

  // Timeline
  pdf.addSection('Project Timeline', [
    { label: 'Design & Approvals', value: `${data.designWeeks} weeks` },
    { label: 'Excavation & Foundation', value: `${data.foundationWeeks} weeks` },
    { label: 'Main Construction', value: `${data.constructionWeeks} weeks` },
    { label: 'Finishes', value: `${data.finishWeeks} weeks` },
    { label: 'Handover & Inspections', value: `${data.handoverWeeks} weeks` },
    { label: 'Total Duration', value: `${data.totalWeeks} weeks (${(data.totalWeeks / 4.33).toFixed(1)} months)` }
  ]);

  // Assumptions
  pdf.addAssumptions([
    { label: 'Cost per Sq. Meter', value: pdf.formatCurrency(data.costPerSqm, config.currencySymbol) },
    { label: 'Build Quality', value: data.buildQuality || 'Standard' },
    { label: 'Material Inflation', value: pdf.formatPercent(0.05) + '/year (estimate)' },
    { label: 'Labor Cost Basis', value: data.laborCostBasis || 'Local market rates' }
  ]);

  pdf.addFooter('Construction costs are estimates based on local market data. Actual costs depend on site conditions, material availability, and labor costs. Get multiple contractor quotes.');

  return pdf;
}

