/**
 * countryData.js
 * ------------------------------------------------------------------
 * MASTER DATA ENGINE — powers Mortgage, Auto, Construction, Solar,
 * Business, and Income/Savings calculators across all apps.
 *
 * Loaded as a PLAIN SCRIPT (not an ES module) so the whole site works by
 * simply double-clicking the HTML files — no local server required.
 * Everything below attaches to the global `window` object at the bottom.
 *
 * All figures are realistic 2026 PLACEHOLDER estimates in LOCAL
 * CURRENCY, meant to be a sensible starting point. They are NOT live
 * market data. Every value below is a plain number and is designed
 * to be user-editable at runtime (see `updateCountryValue` helper
 * and the `overrides` merge pattern at the bottom of this file).
 * ------------------------------------------------------------------
 */

const countryData = {
  // ============================= AFRICA =============================
  NG: {
    name: "Nigeria",
    region: "Africa",
    currency: "NGN",
    currencySymbol: "₦",
    construction: {
      cementPerBag: 12500, rebarPerTon: 1250000, sandPerTon: 45000, gravelPerTon: 55000,
      blocksPerPiece: 650, roofingSheet: 8500, timberPerPlank: 4500, tilesPerSqm: 6500,
      paintPerBucket: 45000, doorUnit: 85000, windowUnit: 65000, electricalWirePerMeter: 850,
      plumbingLumpPerSqm: 12000, cleaningPerSqm: 1500, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 850000, bedroomSet: 650000, kitchenAppliances: 950000, curtainsPerSqm: 8500 },
    auto: { salesTaxRate: 0.075, registrationFee: 45000, importDutyRate: 0.35, tintingCost: 60000, soundSystemCost: 150000, insurancePerMonth: 25000, maintenancePerMonth: 35000, fuelPricePerLiter: 950, customRimsCost: 180000, dashcamCost: 45000 , dieselPricePerLiter: 1150, cngPricePerUnit: 550, seatCoversCost: 45000, floorMatsCost: 15000  },
    solar: { panelCostPerWatt: 350, inverterCost: 850000, batteryStorage: 1200000, installationPerWatt: 120, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 120000 , chargeControllerCost: 85000, mountingHardwareCost: 65000  },
    business: { registrationFeeMin: 50000, legalSetupFee: 250000, officeFurniture: 1200000, avgMonthlyRentPerSqm: 8500, avgPayrollPerEmployee: 250000, corporateTaxRate: 0.30, brandingCost: 350000, licensesPermitsCost: 150000, payrollTaxRate: 0.1, softwareSubscriptionCost: 85000, utilitiesPerSqm: 450 },
    utilities: { electricityPerKwh: 225, waterTariffPerM3: 350, gasCylinder: 15500, wasteDisposal: 5000 },
    income: { flatRate: 0.19 },
    mortgage: { propertyTaxRate: 0.005, homeInsuranceAnnual: 150000, pmiRate: 0.005, closingCostRate: 0.03, originationFeeRate: 0.01 },
  },
  KE: {
    name: "Kenya",
    region: "Africa",
    currency: "KES",
    currencySymbol: "KSh",
    construction: {
      cementPerBag: 750, rebarPerTon: 95000, sandPerTon: 3500, gravelPerTon: 4200,
      blocksPerPiece: 55, roofingSheet: 950, timberPerPlank: 450, tilesPerSqm: 1400,
      paintPerBucket: 4200, doorUnit: 12000, windowUnit: 9500, electricalWirePerMeter: 85,
      plumbingLumpPerSqm: 1200, cleaningPerSqm: 150, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 95000, bedroomSet: 75000, kitchenAppliances: 110000, curtainsPerSqm: 950 },
    auto: { salesTaxRate: 0.16, registrationFee: 5500, importDutyRate: 0.25, tintingCost: 8000, soundSystemCost: 18000, insurancePerMonth: 4500, maintenancePerMonth: 6000, fuelPricePerLiter: 195, customRimsCost: 25000, dashcamCost: 6500 , dieselPricePerLiter: 210, cngPricePerUnit: 130, seatCoversCost: 8000, floorMatsCost: 2500  },
    solar: { panelCostPerWatt: 65, inverterCost: 65000, batteryStorage: 95000, installationPerWatt: 18, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 18000 , chargeControllerCost: 12000, mountingHardwareCost: 9500  },
    business: { registrationFeeMin: 10500, legalSetupFee: 45000, officeFurniture: 180000, avgMonthlyRentPerSqm: 950, avgPayrollPerEmployee: 55000, corporateTaxRate: 0.30, brandingCost: 45000, licensesPermitsCost: 25000, payrollTaxRate: 0.06, softwareSubscriptionCost: 12000, utilitiesPerSqm: 65 },
    utilities: { electricityPerKwh: 28, waterTariffPerM3: 65, gasCylinder: 2800, wasteDisposal: 800 },
    income: { flatRate: 0.25 },
    mortgage: { propertyTaxRate: 0.001, homeInsuranceAnnual: 35000, pmiRate: 0.005, closingCostRate: 0.025, originationFeeRate: 0.01 },
  },
  ZA: {
    name: "South Africa",
    region: "Africa",
    currency: "ZAR",
    currencySymbol: "R",
    construction: {
      cementPerBag: 115, rebarPerTon: 18500, sandPerTon: 450, gravelPerTon: 520,
      blocksPerPiece: 8.5, roofingSheet: 185, timberPerPlank: 95, tilesPerSqm: 220,
      paintPerBucket: 850, doorUnit: 2200, windowUnit: 1800, electricalWirePerMeter: 18,
      plumbingLumpPerSqm: 220, cleaningPerSqm: 25, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 18500, bedroomSet: 14500, kitchenAppliances: 22000, curtainsPerSqm: 185 },
    auto: { salesTaxRate: 0.15, registrationFee: 1200, importDutyRate: 0.25, tintingCost: 1800, soundSystemCost: 4500, insurancePerMonth: 950, maintenancePerMonth: 1200, fuelPricePerLiter: 23, customRimsCost: 4500, dashcamCost: 1200 , dieselPricePerLiter: 21, cngPricePerUnit: 18, seatCoversCost: 1200, floorMatsCost: 450  },
    solar: { panelCostPerWatt: 12, inverterCost: 14500, batteryStorage: 22000, installationPerWatt: 4.5, federalTaxCredit: 0.25, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 2800 , chargeControllerCost: 1800, mountingHardwareCost: 1400  },
    business: { registrationFeeMin: 2200, legalSetupFee: 9500, officeFurniture: 35000, avgMonthlyRentPerSqm: 145, avgPayrollPerEmployee: 18500, corporateTaxRate: 0.27, brandingCost: 8500, licensesPermitsCost: 3500, payrollTaxRate: 0.02, softwareSubscriptionCost: 1800, utilitiesPerSqm: 22 },
    utilities: { electricityPerKwh: 3.2, waterTariffPerM3: 28, gasCylinder: 450, wasteDisposal: 350 },
    income: { flatRate: 0.26 },
    mortgage: { propertyTaxRate: 0.006, homeInsuranceAnnual: 9500, pmiRate: 0.005, closingCostRate: 0.025, originationFeeRate: 0.01 },
  },
  GH: {
    name: "Ghana",
    region: "Africa",
    currency: "GHS",
    currencySymbol: "GH₵",
    construction: {
      cementPerBag: 115, rebarPerTon: 12500, sandPerTon: 650, gravelPerTon: 750,
      blocksPerPiece: 12, roofingSheet: 145, timberPerPlank: 65, tilesPerSqm: 185,
      paintPerBucket: 650, doorUnit: 1800, windowUnit: 1400, electricalWirePerMeter: 15,
      plumbingLumpPerSqm: 180, cleaningPerSqm: 22, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 14500, bedroomSet: 11000, kitchenAppliances: 16500, curtainsPerSqm: 145 },
    auto: { salesTaxRate: 0.125, registrationFee: 950, importDutyRate: 0.35, tintingCost: 1400, soundSystemCost: 3200, insurancePerMonth: 650, maintenancePerMonth: 850, fuelPricePerLiter: 14.5, customRimsCost: 3500, dashcamCost: 950 , dieselPricePerLiter: 15.5, cngPricePerUnit: 8, seatCoversCost: 1000, floorMatsCost: 350  },
    solar: { panelCostPerWatt: 9.5, inverterCost: 11500, batteryStorage: 17500, installationPerWatt: 3.8, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 2200 , chargeControllerCost: 1500, mountingHardwareCost: 1100  },
    business: { registrationFeeMin: 1800, legalSetupFee: 7500, officeFurniture: 28000, avgMonthlyRentPerSqm: 120, avgPayrollPerEmployee: 14500, corporateTaxRate: 0.25, brandingCost: 6500, licensesPermitsCost: 2800, payrollTaxRate: 0.145, softwareSubscriptionCost: 1400, utilitiesPerSqm: 18 },
    utilities: { electricityPerKwh: 2.4, waterTariffPerM3: 18, gasCylinder: 220, wasteDisposal: 180 },
    income: { flatRate: 0.2 },
    mortgage: { propertyTaxRate: 0.005, homeInsuranceAnnual: 4500, pmiRate: 0.005, closingCostRate: 0.03, originationFeeRate: 0.01 },
  },
  EG: {
    name: "Egypt",
    region: "Africa",
    currency: "EGP",
    currencySymbol: "E£",
    construction: {
      cementPerBag: 380, rebarPerTon: 42000, sandPerTon: 850, gravelPerTon: 950,
      blocksPerPiece: 22, roofingSheet: 650, timberPerPlank: 280, tilesPerSqm: 450,
      paintPerBucket: 1800, doorUnit: 5500, windowUnit: 4200, electricalWirePerMeter: 45,
      plumbingLumpPerSqm: 550, cleaningPerSqm: 65, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 45000, bedroomSet: 35000, kitchenAppliances: 52000, curtainsPerSqm: 450 },
    auto: { salesTaxRate: 0.14, registrationFee: 3500, importDutyRate: 0.40, tintingCost: 4500, soundSystemCost: 9500, insurancePerMonth: 1800, maintenancePerMonth: 2200, fuelPricePerLiter: 17.5, customRimsCost: 9500, dashcamCost: 2800 , dieselPricePerLiter: 11.5, cngPricePerUnit: 6.5, seatCoversCost: 3200, floorMatsCost: 950  },
    solar: { panelCostPerWatt: 28, inverterCost: 32000, batteryStorage: 48000, installationPerWatt: 10, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 4500 , chargeControllerCost: 3200, mountingHardwareCost: 2500  },
    business: { registrationFeeMin: 5500, legalSetupFee: 22000, officeFurniture: 85000, avgMonthlyRentPerSqm: 380, avgPayrollPerEmployee: 22000, corporateTaxRate: 0.225, brandingCost: 18000, licensesPermitsCost: 8500, payrollTaxRate: 0.1875, softwareSubscriptionCost: 3500, utilitiesPerSqm: 45 },
    utilities: { electricityPerKwh: 2.15, waterTariffPerM3: 12, gasCylinder: 150, wasteDisposal: 120 },
    income: { flatRate: 0.2 },
    mortgage: { propertyTaxRate: 0.003, homeInsuranceAnnual: 12000, pmiRate: 0.005, closingCostRate: 0.03, originationFeeRate: 0.01 },
  },

  // ============================== EUROPE (EU) =========================
  DE: {
    name: "Germany",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    construction: {
      cementPerBag: 9.5, rebarPerTon: 950, sandPerTon: 32, gravelPerTon: 35,
      blocksPerPiece: 1.8, roofingSheet: 28, timberPerPlank: 14.5, tilesPerSqm: 32,
      paintPerBucket: 85, doorUnit: 650, windowUnit: 480, electricalWirePerMeter: 2.2,
      plumbingLumpPerSqm: 45, cleaningPerSqm: 6.5, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2800, bedroomSet: 2200, kitchenAppliances: 3800, curtainsPerSqm: 32 },
    auto: { salesTaxRate: 0.19, registrationFee: 220, importDutyRate: 0.10, tintingCost: 350, soundSystemCost: 850, insurancePerMonth: 95, maintenancePerMonth: 75, fuelPricePerLiter: 1.75, customRimsCost: 1200, dashcamCost: 180 , dieselPricePerLiter: 1.65, cngPricePerUnit: 1.35, seatCoversCost: 280, floorMatsCost: 65  },
    solar: { panelCostPerWatt: 1.1, inverterCost: 1400, batteryStorage: 6500, installationPerWatt: 0.55, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 280 , chargeControllerCost: 220, mountingHardwareCost: 180  },
    business: { registrationFeeMin: 400, legalSetupFee: 1800, officeFurniture: 6500, avgMonthlyRentPerSqm: 18, avgPayrollPerEmployee: 4800, corporateTaxRate: 0.30, brandingCost: 2200, licensesPermitsCost: 850, payrollTaxRate: 0.2, softwareSubscriptionCost: 320, utilitiesPerSqm: 4.2 },
    utilities: { electricityPerKwh: 0.38, waterTariffPerM3: 2.4, gasCylinder: 42, wasteDisposal: 28 },
    income: { flatRate: 0.35 },
    mortgage: { propertyTaxRate: 0.003, homeInsuranceAnnual: 650, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  FR: {
    name: "France",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    construction: {
      cementPerBag: 8.8, rebarPerTon: 920, sandPerTon: 30, gravelPerTon: 33,
      blocksPerPiece: 1.7, roofingSheet: 26, timberPerPlank: 13.5, tilesPerSqm: 34,
      paintPerBucket: 82, doorUnit: 620, windowUnit: 460, electricalWirePerMeter: 2.1,
      plumbingLumpPerSqm: 42, cleaningPerSqm: 6.2, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2650, bedroomSet: 2100, kitchenAppliances: 3600, curtainsPerSqm: 30 },
    auto: { salesTaxRate: 0.20, registrationFee: 240, importDutyRate: 0.10, tintingCost: 330, soundSystemCost: 800, insurancePerMonth: 90, maintenancePerMonth: 78, fuelPricePerLiter: 1.85, customRimsCost: 1150, dashcamCost: 170 , dieselPricePerLiter: 1.75, cngPricePerUnit: 1.4, seatCoversCost: 260, floorMatsCost: 60  },
    solar: { panelCostPerWatt: 1.15, inverterCost: 1450, batteryStorage: 6800, installationPerWatt: 0.58, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 270 , chargeControllerCost: 230, mountingHardwareCost: 190  },
    business: { registrationFeeMin: 380, legalSetupFee: 1750, officeFurniture: 6200, avgMonthlyRentPerSqm: 22, avgPayrollPerEmployee: 4600, corporateTaxRate: 0.25, brandingCost: 2100, licensesPermitsCost: 800, payrollTaxRate: 0.3, softwareSubscriptionCost: 300, utilitiesPerSqm: 4.5 },
    utilities: { electricityPerKwh: 0.23, waterTariffPerM3: 4.2, gasCylinder: 38, wasteDisposal: 25 },
    income: { flatRate: 0.3 },
    mortgage: { propertyTaxRate: 0.005, homeInsuranceAnnual: 450, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  ES: {
    name: "Spain",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    construction: {
      cementPerBag: 7.2, rebarPerTon: 850, sandPerTon: 26, gravelPerTon: 28,
      blocksPerPiece: 1.4, roofingSheet: 22, timberPerPlank: 11.5, tilesPerSqm: 24,
      paintPerBucket: 65, doorUnit: 480, windowUnit: 380, electricalWirePerMeter: 1.8,
      plumbingLumpPerSqm: 35, cleaningPerSqm: 5.2, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2100, bedroomSet: 1650, kitchenAppliances: 2900, curtainsPerSqm: 24 },
    auto: { salesTaxRate: 0.21, registrationFee: 100, importDutyRate: 0.10, tintingCost: 280, soundSystemCost: 700, insurancePerMonth: 65, maintenancePerMonth: 60, fuelPricePerLiter: 1.55, customRimsCost: 950, dashcamCost: 150 , dieselPricePerLiter: 1.45, cngPricePerUnit: 1.1, seatCoversCost: 220, floorMatsCost: 55  },
    solar: { panelCostPerWatt: 0.95, inverterCost: 1200, batteryStorage: 5800, installationPerWatt: 0.48, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 240 , chargeControllerCost: 190, mountingHardwareCost: 155  },
    business: { registrationFeeMin: 150, legalSetupFee: 1200, officeFurniture: 4800, avgMonthlyRentPerSqm: 14, avgPayrollPerEmployee: 3200, corporateTaxRate: 0.25, brandingCost: 1500, licensesPermitsCost: 600, payrollTaxRate: 0.298, softwareSubscriptionCost: 240, utilitiesPerSqm: 3.2 },
    utilities: { electricityPerKwh: 0.19, waterTariffPerM3: 1.8, gasCylinder: 18.5, wasteDisposal: 20 },
    income: { flatRate: 0.24 },
    mortgage: { propertyTaxRate: 0.005, homeInsuranceAnnual: 350, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  IT: {
    name: "Italy",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    construction: {
      cementPerBag: 8.2, rebarPerTon: 880, sandPerTon: 28, gravelPerTon: 30,
      blocksPerPiece: 1.5, roofingSheet: 24, timberPerPlank: 12.5, tilesPerSqm: 28,
      paintPerBucket: 72, doorUnit: 550, windowUnit: 420, electricalWirePerMeter: 2.0,
      plumbingLumpPerSqm: 38, cleaningPerSqm: 5.8, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2400, bedroomSet: 1900, kitchenAppliances: 3200, curtainsPerSqm: 28 },
    auto: { salesTaxRate: 0.22, registrationFee: 210, importDutyRate: 0.10, tintingCost: 300, soundSystemCost: 750, insurancePerMonth: 85, maintenancePerMonth: 70, fuelPricePerLiter: 1.80, customRimsCost: 1050, dashcamCost: 160 , dieselPricePerLiter: 1.7, cngPricePerUnit: 1.2, seatCoversCost: 240, floorMatsCost: 58  },
    solar: { panelCostPerWatt: 1.05, inverterCost: 1300, batteryStorage: 6200, installationPerWatt: 0.52, federalTaxCredit: 0.5, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 260 , chargeControllerCost: 210, mountingHardwareCost: 170  },
    business: { registrationFeeMin: 220, legalSetupFee: 1600, officeFurniture: 5600, avgMonthlyRentPerSqm: 16, avgPayrollPerEmployee: 3600, corporateTaxRate: 0.24, brandingCost: 1800, licensesPermitsCost: 700, payrollTaxRate: 0.3, softwareSubscriptionCost: 280, utilitiesPerSqm: 3.8 },
    utilities: { electricityPerKwh: 0.29, waterTariffPerM3: 2.0, gasCylinder: 32, wasteDisposal: 26 },
    income: { flatRate: 0.27 },
    mortgage: { propertyTaxRate: 0.004, homeInsuranceAnnual: 400, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  NL: {
    name: "Netherlands",
    region: "Europe",
    currency: "EUR",
    currencySymbol: "€",
    construction: {
      cementPerBag: 10.2, rebarPerTon: 980, sandPerTon: 34, gravelPerTon: 36,
      blocksPerPiece: 1.9, roofingSheet: 30, timberPerPlank: 15.5, tilesPerSqm: 36,
      paintPerBucket: 88, doorUnit: 700, windowUnit: 520, electricalWirePerMeter: 2.4,
      plumbingLumpPerSqm: 48, cleaningPerSqm: 7.0, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 3000, bedroomSet: 2400, kitchenAppliances: 4000, curtainsPerSqm: 34 },
    auto: { salesTaxRate: 0.21, registrationFee: 300, importDutyRate: 0.10, tintingCost: 380, soundSystemCost: 900, insurancePerMonth: 100, maintenancePerMonth: 80, fuelPricePerLiter: 2.05, customRimsCost: 1300, dashcamCost: 190 , dieselPricePerLiter: 1.85, cngPricePerUnit: 1.55, seatCoversCost: 300, floorMatsCost: 70  },
    solar: { panelCostPerWatt: 1.2, inverterCost: 1500, batteryStorage: 7000, installationPerWatt: 0.60, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 300 , chargeControllerCost: 240, mountingHardwareCost: 195  },
    business: { registrationFeeMin: 450, legalSetupFee: 1900, officeFurniture: 6800, avgMonthlyRentPerSqm: 24, avgPayrollPerEmployee: 5000, corporateTaxRate: 0.258, brandingCost: 2400, licensesPermitsCost: 900, payrollTaxRate: 0.195, softwareSubscriptionCost: 340, utilitiesPerSqm: 4.8 },
    utilities: { electricityPerKwh: 0.42, waterTariffPerM3: 1.5, gasCylinder: 45, wasteDisposal: 30 },
    income: { flatRate: 0.37 },
    mortgage: { propertyTaxRate: 0.001, homeInsuranceAnnual: 250, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },

  // ============================ UNITED STATES ==========================
  US: {
    name: "United States",
    region: "North America",
    currency: "USD",
    currencySymbol: "$",
    construction: {
      cementPerBag: 18, rebarPerTon: 950, sandPerTon: 28, gravelPerTon: 32,
      blocksPerPiece: 2.2, roofingSheet: 35, timberPerPlank: 12, tilesPerSqm: 28,
      paintPerBucket: 95, doorUnit: 450, windowUnit: 380, electricalWirePerMeter: 1.5,
      plumbingLumpPerSqm: 42, cleaningPerSqm: 4.5, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2200, bedroomSet: 1800, kitchenAppliances: 3200, curtainsPerSqm: 28 },
    auto: { salesTaxRate: 0.0725, registrationFee: 150, importDutyRate: 0.025, tintingCost: 250, soundSystemCost: 600, insurancePerMonth: 145, maintenancePerMonth: 85, fuelPricePerLiter: 0.89, customRimsCost: 1200, dashcamCost: 150 , dieselPricePerLiter: 0.98, cngPricePerUnit: 0.65, seatCoversCost: 220, floorMatsCost: 55  },
    solar: { panelCostPerWatt: 0.85, inverterCost: 1600, batteryStorage: 9500, installationPerWatt: 0.65, federalTaxCredit: 0.30, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 250 , chargeControllerCost: 200, mountingHardwareCost: 160  },
    business: { registrationFeeMin: 100, legalSetupFee: 1500, officeFurniture: 5500, avgMonthlyRentPerSqm: 32, avgPayrollPerEmployee: 5500, corporateTaxRate: 0.21, brandingCost: 1500, licensesPermitsCost: 750, payrollTaxRate: 0.0765, softwareSubscriptionCost: 350, utilitiesPerSqm: 2.8 },
    utilities: { electricityPerKwh: 0.16, waterTariffPerM3: 2.8, gasCylinder: 22, wasteDisposal: 35 },
    income: { flatRate: 0.22 },
    mortgage: { propertyTaxRate: 0.011, homeInsuranceAnnual: 1500, pmiRate: 0.005, closingCostRate: 0.025, originationFeeRate: 0.01 },
  },

  // ============================ UNITED KINGDOM ==========================
  GB: {
    name: "United Kingdom",
    region: "Europe",
    currency: "GBP",
    currencySymbol: "£",
    construction: {
      cementPerBag: 12, rebarPerTon: 780, sandPerTon: 24, gravelPerTon: 26,
      blocksPerPiece: 1.3, roofingSheet: 20, timberPerPlank: 10.5, tilesPerSqm: 26,
      paintPerBucket: 60, doorUnit: 420, windowUnit: 350, electricalWirePerMeter: 1.6,
      plumbingLumpPerSqm: 32, cleaningPerSqm: 4.8, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 1900, bedroomSet: 1500, kitchenAppliances: 2800, curtainsPerSqm: 24 },
    auto: { salesTaxRate: 0.20, registrationFee: 55, importDutyRate: 0.10, tintingCost: 220, soundSystemCost: 550, insurancePerMonth: 110, maintenancePerMonth: 65, fuelPricePerLiter: 1.48, customRimsCost: 950, dashcamCost: 130 , dieselPricePerLiter: 1.55, cngPricePerUnit: 1.3, seatCoversCost: 200, floorMatsCost: 48  },
    solar: { panelCostPerWatt: 0.90, inverterCost: 1350, batteryStorage: 6200, installationPerWatt: 0.50, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 210 , chargeControllerCost: 180, mountingHardwareCost: 145  },
    business: { registrationFeeMin: 50, legalSetupFee: 1200, officeFurniture: 4800, avgMonthlyRentPerSqm: 28, avgPayrollPerEmployee: 4200, corporateTaxRate: 0.25, brandingCost: 1200, licensesPermitsCost: 550, payrollTaxRate: 0.138, softwareSubscriptionCost: 280, utilitiesPerSqm: 3.4 },
    utilities: { electricityPerKwh: 0.28, waterTariffPerM3: 2.2, gasCylinder: 32, wasteDisposal: 26 },
    income: { flatRate: 0.2 },
    mortgage: { propertyTaxRate: 0.004, homeInsuranceAnnual: 350, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },

  // ================================ ASIA ================================
  CN: {
    name: "China",
    region: "Asia",
    currency: "CNY",
    currencySymbol: "¥",
    construction: {
      cementPerBag: 32, rebarPerTon: 4200, sandPerTon: 120, gravelPerTon: 135,
      blocksPerPiece: 3.5, roofingSheet: 85, timberPerPlank: 45, tilesPerSqm: 65,
      paintPerBucket: 220, doorUnit: 1200, windowUnit: 950, electricalWirePerMeter: 6.5,
      plumbingLumpPerSqm: 110, cleaningPerSqm: 14, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 6500, bedroomSet: 5200, kitchenAppliances: 8500, curtainsPerSqm: 85 },
    auto: { salesTaxRate: 0.13, registrationFee: 500, importDutyRate: 0.15, tintingCost: 1200, soundSystemCost: 2800, insurancePerMonth: 380, maintenancePerMonth: 320, fuelPricePerLiter: 7.8, customRimsCost: 3500, dashcamCost: 450 , dieselPricePerLiter: 7.2, cngPricePerUnit: 4.8, seatCoversCost: 650, floorMatsCost: 180  },
    solar: { panelCostPerWatt: 2.8, inverterCost: 3800, batteryStorage: 18500, installationPerWatt: 1.5, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 1200 , chargeControllerCost: 950, mountingHardwareCost: 750  },
    business: { registrationFeeMin: 800, legalSetupFee: 4500, officeFurniture: 18500, avgMonthlyRentPerSqm: 85, avgPayrollPerEmployee: 9500, corporateTaxRate: 0.25, brandingCost: 8500, licensesPermitsCost: 3500, payrollTaxRate: 0.3, softwareSubscriptionCost: 1800, utilitiesPerSqm: 12 },
    utilities: { electricityPerKwh: 0.65, waterTariffPerM3: 4.2, gasCylinder: 95, wasteDisposal: 45 },
    income: { flatRate: 0.2 },
    mortgage: { propertyTaxRate: 0.0, homeInsuranceAnnual: 1800, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  JP: {
    name: "Japan",
    region: "Asia",
    currency: "JPY",
    currencySymbol: "¥",
    construction: {
      cementPerBag: 950, rebarPerTon: 105000, sandPerTon: 3800, gravelPerTon: 4200,
      blocksPerPiece: 180, roofingSheet: 2800, timberPerPlank: 1200, tilesPerSqm: 3500,
      paintPerBucket: 6500, doorUnit: 45000, windowUnit: 38000, electricalWirePerMeter: 220,
      plumbingLumpPerSqm: 3800, cleaningPerSqm: 450, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 220000, bedroomSet: 180000, kitchenAppliances: 320000, curtainsPerSqm: 2800 },
    auto: { salesTaxRate: 0.10, registrationFee: 12000, importDutyRate: 0, tintingCost: 35000, soundSystemCost: 85000, insurancePerMonth: 9500, maintenancePerMonth: 8500, fuelPricePerLiter: 168, customRimsCost: 95000, dashcamCost: 12000 , dieselPricePerLiter: 148, cngPricePerUnit: 110, seatCoversCost: 15000, floorMatsCost: 4200  },
    solar: { panelCostPerWatt: 165, inverterCost: 220000, batteryStorage: 950000, installationPerWatt: 85, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 28000 , chargeControllerCost: 22000, mountingHardwareCost: 18000  },
    business: { registrationFeeMin: 60000, legalSetupFee: 280000, officeFurniture: 950000, avgMonthlyRentPerSqm: 4800, avgPayrollPerEmployee: 380000, corporateTaxRate: 0.297, brandingCost: 220000, licensesPermitsCost: 85000, payrollTaxRate: 0.155, softwareSubscriptionCost: 42000, utilitiesPerSqm: 650 },
    utilities: { electricityPerKwh: 32, waterTariffPerM3: 220, gasCylinder: 4200, wasteDisposal: 2800 },
    income: { flatRate: 0.2 },
    mortgage: { propertyTaxRate: 0.014, homeInsuranceAnnual: 85000, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  SG: {
    name: "Singapore",
    region: "Asia",
    currency: "SGD",
    currencySymbol: "S$",
    construction: {
      cementPerBag: 12.5, rebarPerTon: 950, sandPerTon: 45, gravelPerTon: 50,
      blocksPerPiece: 2.2, roofingSheet: 38, timberPerPlank: 18, tilesPerSqm: 42,
      paintPerBucket: 95, doorUnit: 680, windowUnit: 520, electricalWirePerMeter: 2.8,
      plumbingLumpPerSqm: 55, cleaningPerSqm: 7.5, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 3200, bedroomSet: 2600, kitchenAppliances: 4500, curtainsPerSqm: 45 },
    auto: { salesTaxRate: 0.09, registrationFee: 1200, importDutyRate: 0.20, tintingCost: 450, soundSystemCost: 1200, insurancePerMonth: 180, maintenancePerMonth: 120, fuelPricePerLiter: 2.85, customRimsCost: 1800, dashcamCost: 220 , dieselPricePerLiter: 2.6, cngPricePerUnit: 2.2, seatCoversCost: 320, floorMatsCost: 85  },
    solar: { panelCostPerWatt: 1.4, inverterCost: 1800, batteryStorage: 8500, installationPerWatt: 0.70, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 350 , chargeControllerCost: 280, mountingHardwareCost: 230  },
    business: { registrationFeeMin: 315, legalSetupFee: 2200, officeFurniture: 8500, avgMonthlyRentPerSqm: 65, avgPayrollPerEmployee: 6500, corporateTaxRate: 0.17, brandingCost: 2800, licensesPermitsCost: 1200, payrollTaxRate: 0.17, softwareSubscriptionCost: 420, utilitiesPerSqm: 5.2 },
    utilities: { electricityPerKwh: 0.32, waterTariffPerM3: 2.7, gasCylinder: 35, wasteDisposal: 28 },
    income: { flatRate: 0.07 },
    mortgage: { propertyTaxRate: 0.001, homeInsuranceAnnual: 450, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  ID: {
    name: "Indonesia",
    region: "Asia",
    currency: "IDR",
    currencySymbol: "Rp",
    construction: {
      cementPerBag: 68000, rebarPerTon: 15500000, sandPerTon: 350000, gravelPerTon: 400000,
      blocksPerPiece: 4500, roofingSheet: 85000, timberPerPlank: 65000, tilesPerSqm: 95000,
      paintPerBucket: 450000, doorUnit: 1800000, windowUnit: 1400000, electricalWirePerMeter: 8500,
      plumbingLumpPerSqm: 120000, cleaningPerSqm: 15000, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 8500000, bedroomSet: 6500000, kitchenAppliances: 12000000, curtainsPerSqm: 95000 },
    auto: { salesTaxRate: 0.11, registrationFee: 850000, importDutyRate: 0.50, tintingCost: 1200000, soundSystemCost: 3500000, insurancePerMonth: 450000, maintenancePerMonth: 550000, fuelPricePerLiter: 12500, customRimsCost: 8500000, dashcamCost: 1800000 , dieselPricePerLiter: 8500, cngPricePerUnit: 5500, seatCoversCost: 950000, floorMatsCost: 280000  },
    solar: { panelCostPerWatt: 9500, inverterCost: 12000000, batteryStorage: 45000000, installationPerWatt: 4200, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 3200000 , chargeControllerCost: 2500000, mountingHardwareCost: 2000000  },
    business: { registrationFeeMin: 3500000, legalSetupFee: 15000000, officeFurniture: 55000000, avgMonthlyRentPerSqm: 185000, avgPayrollPerEmployee: 8500000, corporateTaxRate: 0.22, brandingCost: 8500000, licensesPermitsCost: 3500000, payrollTaxRate: 0.1174, softwareSubscriptionCost: 1800000, utilitiesPerSqm: 45000 },
    utilities: { electricityPerKwh: 1450, waterTariffPerM3: 8500, gasCylinder: 155000, wasteDisposal: 85000 },
    income: { flatRate: 0.15 },
    mortgage: { propertyTaxRate: 0.001, homeInsuranceAnnual: 3500000, pmiRate: 0.005, closingCostRate: 0.025, originationFeeRate: 0.01 },
  },

  // ================================ INDIA ================================
  IN: {
    name: "India",
    region: "Asia",
    currency: "INR",
    currencySymbol: "₹",
    construction: {
      cementPerBag: 400, rebarPerTon: 62000, sandPerTon: 1800, gravelPerTon: 2100,
      blocksPerPiece: 55, roofingSheet: 850, timberPerPlank: 650, tilesPerSqm: 950,
      paintPerBucket: 3800, doorUnit: 12000, windowUnit: 9500, electricalWirePerMeter: 45,
      plumbingLumpPerSqm: 650, cleaningPerSqm: 65, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 65000, bedroomSet: 52000, kitchenAppliances: 95000, curtainsPerSqm: 850 },
    auto: { salesTaxRate: 0.28, registrationFee: 8500, importDutyRate: 0.60, tintingCost: 12000, soundSystemCost: 25000, insurancePerMonth: 3500, maintenancePerMonth: 4200, fuelPricePerLiter: 105, customRimsCost: 35000, dashcamCost: 4500 , dieselPricePerLiter: 92, cngPricePerUnit: 78, seatCoversCost: 6500, floorMatsCost: 1800  },
    solar: { panelCostPerWatt: 28, inverterCost: 32000, batteryStorage: 145000, installationPerWatt: 12, federalTaxCredit: 0.20, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 15000 , chargeControllerCost: 12000, mountingHardwareCost: 9500  },
    business: { registrationFeeMin: 5500, legalSetupFee: 35000, officeFurniture: 185000, avgMonthlyRentPerSqm: 850, avgPayrollPerEmployee: 45000, corporateTaxRate: 0.25, brandingCost: 65000, licensesPermitsCost: 28000, payrollTaxRate: 0.1275, softwareSubscriptionCost: 12000, utilitiesPerSqm: 85 },
    utilities: { electricityPerKwh: 7.5, waterTariffPerM3: 22, gasCylinder: 950, wasteDisposal: 350 },
    income: { flatRate: 0.2 },
    mortgage: { propertyTaxRate: 0.003, homeInsuranceAnnual: 8500, pmiRate: 0.005, closingCostRate: 0.03, originationFeeRate: 0.01 },
  },

  // ============================ OTHER COUNTRIES ==========================
  AE: {
    name: "United Arab Emirates",
    region: "Other",
    currency: "AED",
    currencySymbol: "AED",
    construction: {
      cementPerBag: 16, rebarPerTon: 2650, sandPerTon: 65, gravelPerTon: 75,
      blocksPerPiece: 3.2, roofingSheet: 55, timberPerPlank: 32, tilesPerSqm: 48,
      paintPerBucket: 165, doorUnit: 950, windowUnit: 780, electricalWirePerMeter: 4.2,
      plumbingLumpPerSqm: 85, cleaningPerSqm: 12, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 4800, bedroomSet: 3800, kitchenAppliances: 6500, curtainsPerSqm: 65 },
    auto: { salesTaxRate: 0.05, registrationFee: 380, importDutyRate: 0.05, tintingCost: 650, soundSystemCost: 1500, insurancePerMonth: 250, maintenancePerMonth: 180, fuelPricePerLiter: 2.85, customRimsCost: 2800, dashcamCost: 450 , dieselPricePerLiter: 2.95, cngPricePerUnit: 1.85, seatCoversCost: 550, floorMatsCost: 150  },
    solar: { panelCostPerWatt: 3.2, inverterCost: 4500, batteryStorage: 22000, installationPerWatt: 1.8, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 750 , chargeControllerCost: 600, mountingHardwareCost: 480  },
    business: { registrationFeeMin: 12000, legalSetupFee: 18500, officeFurniture: 32000, avgMonthlyRentPerSqm: 120, avgPayrollPerEmployee: 12000, corporateTaxRate: 0.09, brandingCost: 9500, licensesPermitsCost: 4500, payrollTaxRate: 0.125, softwareSubscriptionCost: 1200, utilitiesPerSqm: 18 },
    utilities: { electricityPerKwh: 0.38, waterTariffPerM3: 4.5, gasCylinder: 95, wasteDisposal: 65 },
    income: { flatRate: 0.0 },
    mortgage: { propertyTaxRate: 0.0, homeInsuranceAnnual: 2200, pmiRate: 0.005, closingCostRate: 0.04, originationFeeRate: 0.01 },
  },
  CA: {
    name: "Canada",
    region: "Other",
    currency: "CAD",
    currencySymbol: "C$",
    construction: {
      cementPerBag: 22, rebarPerTon: 1150, sandPerTon: 35, gravelPerTon: 38,
      blocksPerPiece: 2.6, roofingSheet: 42, timberPerPlank: 15, tilesPerSqm: 32,
      paintPerBucket: 110, doorUnit: 520, windowUnit: 450, electricalWirePerMeter: 1.8,
      plumbingLumpPerSqm: 48, cleaningPerSqm: 5.2, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2600, bedroomSet: 2100, kitchenAppliances: 3600, curtainsPerSqm: 32 },
    auto: { salesTaxRate: 0.13, registrationFee: 120, importDutyRate: 0.061, tintingCost: 300, soundSystemCost: 700, insurancePerMonth: 165, maintenancePerMonth: 95, fuelPricePerLiter: 1.55, customRimsCost: 1400, dashcamCost: 180 , dieselPricePerLiter: 1.6, cngPricePerUnit: 1.05, seatCoversCost: 260, floorMatsCost: 65  },
    solar: { panelCostPerWatt: 1.0, inverterCost: 1800, batteryStorage: 10500, installationPerWatt: 0.75, federalTaxCredit: 0.15, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 320 , chargeControllerCost: 260, mountingHardwareCost: 210  },
    business: { registrationFeeMin: 200, legalSetupFee: 1800, officeFurniture: 6200, avgMonthlyRentPerSqm: 28, avgPayrollPerEmployee: 5200, corporateTaxRate: 0.265, brandingCost: 1800, licensesPermitsCost: 750, payrollTaxRate: 0.088, softwareSubscriptionCost: 380, utilitiesPerSqm: 3.2 },
    utilities: { electricityPerKwh: 0.13, waterTariffPerM3: 2.6, gasCylinder: 28, wasteDisposal: 32 },
    income: { flatRate: 0.28 },
    mortgage: { propertyTaxRate: 0.01, homeInsuranceAnnual: 1400, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
  AU: {
    name: "Australia",
    region: "Other",
    currency: "AUD",
    currencySymbol: "A$",
    construction: {
      cementPerBag: 14, rebarPerTon: 1350, sandPerTon: 55, gravelPerTon: 60,
      blocksPerPiece: 3.0, roofingSheet: 48, timberPerPlank: 22, tilesPerSqm: 38,
      paintPerBucket: 120, doorUnit: 580, windowUnit: 480, electricalWirePerMeter: 2.1,
      plumbingLumpPerSqm: 55, cleaningPerSqm: 6.5, laborMultiplier: 0.4, archFeeMultiplier: 0.1,
    },
    furnishing: { livingRoomSet: 2900, bedroomSet: 2300, kitchenAppliances: 4000, curtainsPerSqm: 36 },
    auto: { salesTaxRate: 0.10, registrationFee: 280, importDutyRate: 0.05, tintingCost: 350, soundSystemCost: 800, insurancePerMonth: 155, maintenancePerMonth: 105, fuelPricePerLiter: 1.85, customRimsCost: 1500, dashcamCost: 210 , dieselPricePerLiter: 1.9, cngPricePerUnit: 1.45, seatCoversCost: 280, floorMatsCost: 75  },
    solar: { panelCostPerWatt: 0.75, inverterCost: 1500, batteryStorage: 9800, installationPerWatt: 0.55, federalTaxCredit: 0, degradationRate: 0.005, inverterReplacementYear: 12, smartMonitoringCost: 300 , chargeControllerCost: 240, mountingHardwareCost: 195  },
    business: { registrationFeeMin: 550, legalSetupFee: 2200, officeFurniture: 7200, avgMonthlyRentPerSqm: 32, avgPayrollPerEmployee: 6200, corporateTaxRate: 0.30, brandingCost: 2200, licensesPermitsCost: 950, payrollTaxRate: 0.115, softwareSubscriptionCost: 400, utilitiesPerSqm: 3.8 },
    utilities: { electricityPerKwh: 0.32, waterTariffPerM3: 3.2, gasCylinder: 42, wasteDisposal: 38 },
    income: { flatRate: 0.28 },
    mortgage: { propertyTaxRate: 0.003, homeInsuranceAnnual: 1600, pmiRate: 0.005, closingCostRate: 0.02, originationFeeRate: 0.01 },
  },
};

/**
 * Flat list of countries for dropdown menus, grouped/sortable by region.
 * Example: [{ code: "NG", name: "Nigeria", region: "Africa", currency: "NGN", currencySymbol: "₦" }, ...]
 */
const countryList = Object.entries(countryData).map(([code, data]) => ({
  code,
  name: data.name,
  region: data.region,
  currency: data.currency,
  currencySymbol: data.currencySymbol,
}));

/** Returns countries grouped by region, useful for <optgroup> dropdowns. */
function getCountriesByRegion() {
  return countryList.reduce((groups, country) => {
    if (!groups[country.region]) groups[country.region] = [];
    groups[country.region].push(country);
    return groups;
  }, {});
}

/** Convenience getter for a single country's full data object. */
function getCountry(code) {
  return countryData[code] || null;
}

/**
 * Lets the user override any single value at runtime without mutating
 * the base dataset in place — returns a new object.
 * Example: updateCountryValue(countryData, "NG", "construction", "cementPerBag", 13000)
 */
function updateCountryValue(data, countryCode, category, field, newValue) {
  if (!data[countryCode] || !data[countryCode][category]) return data;
  return {
    ...data,
    [countryCode]: {
      ...data[countryCode],
      [category]: {
        ...data[countryCode][category],
        [field]: newValue,
      },
    },
  };
}

// Expose as globals for plain <script> loading (no ES module / server required)
window.countryData = countryData;
window.countryList = countryList;
window.getCountriesByRegion = getCountriesByRegion;
window.getCountry = getCountry;
window.updateCountryValue = updateCountryValue;
