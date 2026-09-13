// ============================================
// ENHANCED PDF EXPORT LIBRARY
// src/lib/pdfExport.ts
// ============================================

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface PDFConfig {
  title: string;
  subtitle: string;
  country: string;
  currencySymbol: string;
  calculatorType: string;
}

interface PDFSection {
  title: string;
  items: Array<{
    label: string;
    value: string;
    highlight?: boolean;
  }>;
}

/**
 * Enhanced PDF Export with professional styling
 */
export class BudgetProPDF {
  doc: jsPDF;
  pageWidth: number;
  pageHeight: number;
  margin: number;
  currentY: number;

  constructor() {
    this.doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 15;
    this.currentY = this.margin;
  }

  /**
   * Add professional header with branding
   */
  addHeader(config: PDFConfig) {
    const headerHeight = 40;
    
    // Background rectangle
    this.doc.setFillColor(10, 22, 40); // Navy background
    this.doc.rect(0, 0, this.pageWidth, headerHeight, 'F');

    // Logo text
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(24);
    this.doc.setTextColor(245, 166, 35); // Gold
    this.doc.text('BudgetPro', this.margin, 18);

    // Calculator type subtitle
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(`${config.title} Report`, this.margin, 28);

    // Generation date & country
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    this.doc.setTextColor(140, 150, 180);
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.doc.text(
      `Generated: ${date} | Country: ${config.country}`,
      this.margin,
      36
    );

    // Divider line
    this.doc.setDrawColor(245, 166, 35);
    this.doc.setLineWidth(0.5);
    this.doc.line(this.margin, headerHeight - 2, this.pageWidth - this.margin, headerHeight - 2);

    this.currentY = headerHeight + 8;
  }

  /**
   * Add section with title and data
   */
  addSection(title: string, items: Array<{ label: string; value: string; highlight?: boolean }>) {
    // Section title
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text(title, this.margin, this.currentY);
    
    // Divider under title
    this.doc.setDrawColor(245, 166, 35);
    this.doc.setLineWidth(0.3);
    this.doc.line(
      this.margin,
      this.currentY + 1.5,
      this.pageWidth - this.margin,
      this.currentY + 1.5
    );

    this.currentY += 6;

    // Items
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);

    items.forEach((item) => {
      // Check if we need a new page
      if (this.currentY > this.pageHeight - 30) {
        this.addNewPage();
      }

      // Label
      this.doc.setTextColor(60, 60, 60);
      this.doc.text(item.label + ':', this.margin, this.currentY);

      // Value (right-aligned)
      const valueX = this.pageWidth - this.margin - 50;
      if (item.highlight) {
        this.doc.setTextColor(245, 166, 35);
        this.doc.setFont('helvetica', 'bold');
      } else {
        this.doc.setTextColor(0, 0, 0);
        this.doc.setFont('helvetica', 'normal');
      }
      this.doc.text(item.value, valueX, this.currentY, { align: 'right' });

      this.currentY += 6;
    });

    this.currentY += 4; // Extra spacing between sections
  }

  /**
   * Add table (for breakdowns)
   */
  addTable(columns: string[], rows: Array<string[]>) {
    if (this.currentY > this.pageHeight - 50) {
      this.addNewPage();
    }

    // Use jsPDF autoTable plugin
    (this.doc as any).autoTable({
      startY: this.currentY,
      head: [columns],
      body: rows,
      margin: { left: this.margin, right: this.margin },
      headStyles: {
        fillColor: [245, 166, 35],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        textColor: [60, 60, 60],
        fontSize: 9
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      lineColor: [200, 200, 200],
      lineWidth: 0.3,
      didDrawPage: (data: any) => {
        this.currentY = data.pageCount > 1 ? 20 : this.currentY;
      }
    });

    this.currentY = (this.doc as any).lastAutoTable.finalY + 8;
  }

  /**
   * Add highlighted callout box (for key metrics)
   */
  addCallout(title: string, value: string, color: 'gold' | 'green' | 'red' = 'gold') {
    if (this.currentY > this.pageHeight - 40) {
      this.addNewPage();
    }

    const colorMap = {
      gold: [245, 166, 35],
      green: [61, 220, 151],
      red: [239, 106, 95]
    };

    const rgb = colorMap[color];

    // Box background
    this.doc.setFillColor(rgb[0], rgb[1], rgb[2]);
    this.doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 20, 'F');

    // Title (white)
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(title, this.margin + 3, this.currentY + 6);

    // Value (large, white)
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(value, this.pageWidth - this.margin - 3, this.currentY + 14, { align: 'right' });

    this.currentY += 24;
  }

  /**
   * Add assumptions/disclaimers section
   */
  addAssumptions(assumptions: Array<{ label: string; value: string }>) {
    if (this.currentY > this.pageHeight - 40) {
      this.addNewPage();
    }

    // Section title
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(11);
    this.doc.setTextColor(0, 0, 0);
    this.doc.text('Key Assumptions', this.margin, this.currentY);
    this.currentY += 6;

    // Bullet points
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8);
    this.doc.setTextColor(80, 80, 80);

    assumptions.forEach((item) => {
      if (this.currentY > this.pageHeight - 20) {
        this.addNewPage();
      }
      
      const text = `• ${item.label}: ${item.value}`;
      const lines = this.doc.splitTextToSize(text, this.pageWidth - 2 * this.margin - 4);
      this.doc.text(lines, this.margin + 2, this.currentY);
      this.currentY += lines.length * 3.5 + 1;
    });
  }

  /**
   * Add footer with disclaimer
   */
  addFooter(disclaimerText?: string) {
    const footerY = this.pageHeight - 12;

    this.doc.setDrawColor(200, 200, 200);
    this.doc.setLineWidth(0.3);
    this.doc.line(this.margin, footerY - 5, this.pageWidth - this.margin, footerY - 5);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(7);
    this.doc.setTextColor(120, 120, 120);

    const defaultDisclaimer =
      'All figures are editable local-market placeholders. Verify with qualified professionals before making financial commitments.';
    const disclaimer = disclaimerText || defaultDisclaimer;

    const lines = this.doc.splitTextToSize(disclaimer, this.pageWidth - 2 * this.margin - 4);
    this.doc.text(lines, this.margin, footerY);

    // Page number
    const pageCount = (this.doc as any).internal.pages.length - 1;
    if (pageCount > 1) {
      this.doc.text(
        `Page 1 of ${pageCount}`,
        this.pageWidth - this.margin,
        footerY,
        { align: 'right' }
      );
    }
  }

  /**
   * New page with header
   */
  addNewPage() {
    this.doc.addPage();
    this.currentY = this.margin + 10;
  }

  /**
   * Format currency value
   */
  formatCurrency(value: number, symbol: string): string {
    const formatted = Math.round(Math.abs(value)).toLocaleString(undefined, {
      maximumFractionDigits: 0
    });
    const sign = value < 0 ? '-' : '';
    return `${sign}${symbol}${formatted}`;
  }

  /**
   * Format percentage
   */
  formatPercent(value: number): string {
    return (value * 100).toFixed(1) + '%';
  }

  /**
   * Save PDF
   */
  save(filename: string) {
    this.doc.save(filename);
  }

  /**
   * Get PDF as data URL (for email, upload, etc.)
   */
  getDataUrl(): string {
    return this.doc.output('datauristring');
  }
}

// ============================================
// CALCULATOR-SPECIFIC PDF GENERATORS
// ============================================

/**
 * Generate Mortgage Calculator PDF
 */
export function generateMortgagePDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Summary stats
  pdf.addCallout('Monthly PITI Payment', pdf.formatCurrency(data.monthlyPITI, config.currencySymbol), 'gold');
  pdf.addCallout('Front-End Affordability', pdf.formatPercent(data.frontEndRatio), data.frontEndRatio <= 0.28 ? 'green' : 'red');

  // Input parameters section
  pdf.addSection('Property Details', [
    { label: 'Purchase Price', value: pdf.formatCurrency(data.purchasePrice, config.currencySymbol) },
    { label: 'Down Payment', value: pdf.formatCurrency(data.downPayment, config.currencySymbol) + ` (${pdf.formatPercent(data.downPaymentPercent)})` },
    { label: 'Loan Amount', value: pdf.formatCurrency(data.loanAmount, config.currencySymbol) }
  ]);

  pdf.addSection('Financing Terms', [
    { label: 'Interest Rate', value: `${data.interestRate}%` },
    { label: 'Loan Term', value: `${data.loanTerm} years` },
    { label: 'Monthly Payment', value: pdf.formatCurrency(data.monthlyPayment, config.currencySymbol), highlight: true }
  ]);

  pdf.addSection('Taxes & Insurance', [
    { label: 'Property Tax (Annual)', value: pdf.formatCurrency(data.annualPropertyTax, config.currencySymbol) },
    { label: 'Property Tax (Monthly)', value: pdf.formatCurrency(data.monthlyPropertyTax, config.currencySymbol) },
    { label: 'Home Insurance (Monthly)', value: pdf.formatCurrency(data.monthlyInsurance, config.currencySymbol) }
  ]);

  pdf.addSection('Costs at Closing', [
    { label: 'Closing Costs', value: pdf.formatCurrency(data.closingCosts, config.currencySymbol) },
    { label: 'Total Cash at Closing', value: pdf.formatCurrency(data.downPayment + data.closingCosts, config.currencySymbol), highlight: true }
  ]);

  // PITI Breakdown Table
  pdf.addTable(
    ['Component', 'Monthly Amount', '% of Total'],
    [
      ['Principal & Interest', pdf.formatCurrency(data.monthlyPI, config.currencySymbol), pdf.formatPercent(data.monthlyPI / data.monthlyPITI)],
      ['Property Tax', pdf.formatCurrency(data.monthlyPropertyTax, config.currencySymbol), pdf.formatPercent(data.monthlyPropertyTax / data.monthlyPITI)],
      ['Insurance', pdf.formatCurrency(data.monthlyInsurance, config.currencySymbol), pdf.formatPercent(data.monthlyInsurance / data.monthlyPITI)],
      ['Total PITI', pdf.formatCurrency(data.monthlyPITI, config.currencySymbol), '100%']
    ]
  );

  // Key assumptions
  pdf.addAssumptions([
    { label: 'Interest Rate', value: `${data.interestRate}% (fixed for ${data.loanTerm} years)` },
    { label: 'Property Tax Rate', value: `${(data.propertyTaxRate * 100).toFixed(2)}% annually` },
    { label: 'Home Insurance', value: `${pdf.formatCurrency(data.annualInsurance, config.currencySymbol)}/year` },
    { label: 'Tax Deductibility', value: 'Consult a tax professional for your jurisdiction' },
    { label: '28/36 Rule', value: 'Front-end (28%): PITI ÷ Gross Income | Back-end (36%): All debt ÷ Gross Income' }
  ]);

  // Footer
  pdf.addFooter('Mortgage calculations are estimates. Actual payments may vary based on escrow, PMI, and lender fees.');

  return pdf;
}

/**
 * Generate Solar Calculator PDF
 */
export function generateSolarPDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Key metrics
  pdf.addCallout('25-Year Net Savings', pdf.formatCurrency(data.netSavings25, config.currencySymbol), 'green');
  pdf.addCallout('Payback Period', `${data.paybackYears.toFixed(1)} years`, 'gold');
  pdf.addCallout('Net ROI', `${data.roi >= 0 ? '+' : ''}${data.roi.toFixed(1)}%`, data.roi >= 0 ? 'green' : 'red');

  // System design
  pdf.addSection('System Design', [
    { label: 'System Size', value: `${data.systemSize} kW` },
    { label: 'Annual Production', value: `${(data.systemSize * 1500).toLocaleString()} kWh/year` },
    { label: 'Roof Type', value: data.roofType },
    { label: 'Roof Complexity Factor', value: `${data.roofMultiplier}x` }
  ]);

  // Costs
  pdf.addSection('Upfront Costs', [
    { label: 'Panel Equipment', value: pdf.formatCurrency(data.panelCost, config.currencySymbol) },
    { label: 'Installation', value: pdf.formatCurrency(data.installationCost, config.currencySymbol) },
    { label: 'Gross Cost', value: pdf.formatCurrency(data.grossCost, config.currencySymbol) },
    { label: 'Federal Tax Credit', value: `−${pdf.formatCurrency(data.federalCredit, config.currencySymbol)}` },
    { label: 'State/Local Incentives', value: `−${pdf.formatCurrency(data.stateIncentives, config.currencySymbol)}` },
    { label: 'Net Cost (After Incentives)', value: pdf.formatCurrency(data.netCost, config.currencySymbol), highlight: true }
  ]);

  if (data.addOnsTotal > 0) {
    pdf.addSection('Add-Ons', [
      ...(data.battery ? [{ label: 'Battery Storage', value: pdf.formatCurrency(data.batteryCost, config.currencySymbol) }] : []),
      ...(data.inverter ? [{ label: 'Inverter', value: pdf.formatCurrency(data.inverterCost, config.currencySymbol) }] : []),
      ...(data.monitoring ? [{ label: 'Smart Monitoring', value: pdf.formatCurrency(data.monitoringCost, config.currencySymbol) }] : []),
      { label: 'Add-On Subtotal', value: pdf.formatCurrency(data.addOnsTotal, config.currencySymbol) }
    ]);
  }

  // Savings
  pdf.addSection('Monthly & Annual Savings', [
    { label: 'Current Monthly Bill', value: pdf.formatCurrency(data.currentBill, config.currencySymbol) },
    { label: 'Electricity Tariff', value: `${config.currencySymbol}${data.tariff}/kWh` },
    { label: 'Monthly Savings (Year 1)', value: pdf.formatCurrency(data.monthlySavingsY1, config.currencySymbol), highlight: true },
    { label: 'Annual Savings (Year 1)', value: pdf.formatCurrency(data.annualSavingsY1, config.currencySymbol), highlight: true }
  ]);

  // 25-year projection
  pdf.addSection('25-Year Projection', [
    { label: 'Gross Savings (before inverter replacement)', value: pdf.formatCurrency(data.grossSavings25, config.currencySymbol) },
    { label: 'Inverter Replacement Year', value: `Year ${data.inverterYear} (−${pdf.formatCurrency(data.inverterCost, config.currencySymbol)})` },
    { label: 'Net Savings (25 years)', value: pdf.formatCurrency(data.netSavings25, config.currencySymbol), highlight: true }
  ]);

  // Financing (if applicable)
  if (data.financing) {
    pdf.addSection('Financing', [
      { label: 'Loan Amount', value: pdf.formatCurrency(data.netCost, config.currencySymbol) },
      { label: 'Loan Term', value: `${data.loanTerm} years` },
      { label: 'Interest Rate', value: `${data.loanRate}%` },
      { label: 'Monthly Payment', value: pdf.formatCurrency(data.monthlyLoanPayment, config.currencySymbol) }
    ]);
  }

  // Cost breakdown table
  pdf.addTable(
    ['Component', 'Cost', 'After Incentives'],
    [
      ['Panels', pdf.formatCurrency(data.panelCost, config.currencySymbol), pdf.formatCurrency(data.panelCost, config.currencySymbol)],
      ['Installation', pdf.formatCurrency(data.installationCost, config.currencySymbol), pdf.formatCurrency(data.installationCost, config.currencySymbol)],
      ['Credits & Incentives', '−', `−${pdf.formatCurrency(data.federalCredit + data.stateIncentives, config.currencySymbol)}`],
      ['Net System Cost', '—', pdf.formatCurrency(data.netCost, config.currencySymbol)]
    ]
  );

  // Assumptions
  pdf.addAssumptions([
    { label: 'Panel Degradation', value: `${pdf.formatPercent(data.degradation)}/year` },
    { label: 'Annual Production', value: `${data.systemSize * 1500} kWh/year (1500 kWh/kW assumption)` },
    { label: 'Electricity Tariff', value: `${config.currencySymbol}${data.tariff}/kWh (assumed constant, in reality inflation applies)` },
    { label: 'Inverter Replacement', value: `Year ${data.inverterYear}, typical lifespan 10–15 years` },
    { label: 'Grid Supply Availability', value: `${data.gridHours} hours/day average` }
  ]);

  pdf.addFooter('Solar savings estimates depend on actual system performance, weather patterns, and electricity rates. Consult a professional solar installer for exact quotes.');

  return pdf;
}

/**
 * Generate Auto Calculator PDF
 */
export function generateAutoPDF(data: any, config: PDFConfig) {
  const pdf = new BudgetProPDF();

  // Header
  pdf.addHeader(config);

  // Key metric
  pdf.addCallout('Monthly Payment', pdf.formatCurrency(data.monthlyPayment, config.currencySymbol), 'gold');
  pdf.addCallout('Total Cost of Ownership (5yr)', pdf.formatCurrency(data.totalCost5Year, config.currencySymbol), 'gold');

  // Vehicle details
  pdf.addSection('Vehicle Details', [
    { label: 'Vehicle Price', value: pdf.formatCurrency(data.vehiclePrice, config.currencySymbol) },
    { label: 'Accessories & Upgrades', value: pdf.formatCurrency(data.accessories, config.currencySymbol) },
    { label: 'Total Drive-Away Price', value: pdf.formatCurrency(data.driveAwayPrice, config.currencySymbol), highlight: true }
  ]);

  // Financing
  pdf.addSection('Auto Loan', [
    { label: 'Down Payment', value: pdf.formatCurrency(data.downPayment, config.currencySymbol) },
    { label: 'Loan Amount', value: pdf.formatCurrency(data.loanAmount, config.currencySymbol) },
    { label: 'Interest Rate', value: `${data.interestRate}%` },
    { label: 'Loan Term', value: `${data.loanTerm} years` },
    { label: 'Monthly Payment', value: pdf.formatCurrency(data.monthlyPayment, config.currencySymbol), highlight: true }
  ]);

  // Operating costs
  pdf.addSection('Monthly Operating Costs', [
    { label: 'Fuel/Electricity', value: pdf.formatCurrency(data.monthlyFuel, config.currencySymbol) },
    { label: 'Insurance', value: pdf.formatCurrency(data.monthlyInsurance, config.currencySymbol) },
    { label: 'Maintenance', value: pdf.formatCurrency(data.monthlyMaintenance, config.currencySymbol) },
    { label: 'Registration/Tax', value: pdf.formatCurrency(data.monthlyRegistration, config.currencySymbol) },
    { label: 'Total Monthly Cost', value: pdf.formatCurrency(data.totalMonthlyCost, config.currencySymbol), highlight: true }
  ]);

  // Affordability check
  pdf.addSection('Affordability Analysis', [
    { label: 'Your Gross Monthly Income', value: pdf.formatCurrency(data.grossMonthlyIncome, config.currencySymbol) },
    { label: 'Car Payment as % of Income', value: pdf.formatPercent(data.monthlyPayment / data.grossMonthlyIncome), highlight: data.monthlyPayment / data.grossMonthlyIncome > 0.1 },
    { label: 'Recommended Max (10% Rule)', value: pdf.formatCurrency(data.grossMonthlyIncome * 0.1, config.currencySymbol) }
  ]);

  // 5-year cost breakdown
  pdf.addTable(
    ['Year', 'Loan Payment', 'Operating Cost', 'Annual Total'],
    [
      ['Year 1', pdf.formatCurrency(data.loanYear1, config.currencySymbol), pdf.formatCurrency(data.opCostYear1, config.currencySymbol), pdf.formatCurrency(data.totalYear1, config.currencySymbol)],
      ['Year 2', pdf.formatCurrency(data.loanYear2, config.currencySymbol), pdf.formatCurrency(data.opCostYear2, config.currencySymbol), pdf.formatCurrency(data.totalYear2, config.currencySymbol)],
      ['Year 3–5 (est.)', '—', pdf.formatCurrency(data.opCostYear3Plus * 3, config.currencySymbol), '—'],
      ['5-Year Total', '—', '—', pdf.formatCurrency(data.totalCost5Year, config.currencySymbol)]
    ]
  );

  // Assumptions
  pdf.addAssumptions([
    { label: 'Fuel Economy', value: `${data.mpg} MPG (EPA estimate; real-world may vary)` },
    { label: 'Annual Mileage', value: `${data.annualMiles.toLocaleString()} miles` },
    { label: 'Fuel Price', value: `${config.currencySymbol}${data.fuelPrice}/gallon` },
    { label: 'Insurance Premium', value: pdf.formatCurrency(data.annualInsurance, config.currencySymbol) },
    { label: 'Maintenance Cost', value: `${(data.maintenancePercent * 100).toFixed(1)}% of vehicle price annually` }
  ]);

  pdf.addFooter('Auto costs vary by vehicle, driver, location, and usage. This is an estimate; consult your dealer and insurer for exact figures.');

  return pdf;
}

// Similar functions for Business, Construction, and Income calculators...
// (I'll provide those in a follow-up)

