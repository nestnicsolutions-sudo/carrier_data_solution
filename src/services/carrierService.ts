// import Papa from 'papaparse';

// export interface CarrierData {
//   DOT_NUMBER: string;
//   CARRIER_OPERATION: string;
//   PHONE: string;
//   FAX: string;
//   CELL_PHONE: string;
//   COMPANY_OFFICER_1: string;
//   COMPANY_OFFICER_2: string;
//   BUSINESS_ORG_DESC: string;
//   TRUCK_UNITS: number;
//   POWER_UNITS: number;
//   TOTAL_INTRASTATE_DRIVERS: number;
//   TOTAL_DRIVERS: number;
//   CLASSDEF: string;
//   LEGAL_NAME: string;
//   DBA_NAME: string;
//   PHY_STREET: string;
//   PHY_CITY: string;
//   PHY_COUNTRY: string;
//   PHY_STATE: string;
//   PHY_ZIP: string;
//   CARRIER_MAILING_STREET: string;
//   CARRIER_MAILING_STATE: string;
//   CARRIER_MAILING_CITY: string;
//   CARRIER_MAILING_COUNTRY: string;
//   CARRIER_MAILING_ZIP: string;
//   CARRIER_MAILING_CNTY: string;
//   EMAIL_ADDRESS: string;
//   // Allow for any additional columns that might exist
//   [key: string]: any;
// }

// export interface FilterParams {
//   carrierOperation?: string; // Updated to match interface
//   powerUnits?: number;
//   totalDrivers?: number;
//   classDef?: string;
//   state?: string;
// }

// export interface FilterResponse {
//   count: number;
//   data: CarrierData[];
//   error?: string;
// }

// export const US_STATES = [
//   'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
//   'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
//   'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
//   'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
//   'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
// ];

// export const CARRIER_OPERATIONS = ['A', 'B', 'C'];
// export const CLASS_DEFINITIONS = ['AUTHORIZED FOR HIRE', 'PRIVATE PROPERTY', 'EXEMPT FOR HIRE'];

// export async function filterCarriers(params: FilterParams): Promise<FilterResponse> {
//   try {
//     console.log('Filtering carriers with params:', params);
    
//     // Updated path - make sure this matches your actual CSV file location
//     const response = await fetch('./filtered_carrier_data.csv'); // or whatever your file is named
//     if (!response.ok) {
//       throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
//     }
    
//     const csvText = await response.text();
    
//     return new Promise((resolve, reject) => {
//       Papa.parse(csvText, {
//         header: true,
//         skipEmptyLines: true,
//         dynamicTyping: true, // This will automatically convert numbers
//         transformHeader: (header: string) => header.trim(),
//         transform: (value: string, header: string) => {
//           if (typeof value === 'string') {
//             return value.trim();
//           }
//           return value;
//         },
//         complete: (results) => {
//           try {
//             console.log('Raw parse results:', {
//               data: results.data.slice(0, 2), // Show first 2 rows
//               errors: results.errors,
//               meta: results.meta
//             });

//             if (results.errors.length > 0) {
//               console.error('CSV parse errors:', results.errors);
//               // Don't fail completely on parse errors, just log them
//               console.warn('Continuing despite parse errors...');
//             }

//             let filteredData = results.data as CarrierData[];
//             console.log(`Raw data length: ${filteredData.length}`);
//             console.log('Sample raw row:', filteredData[0]);
            
//             // Remove any rows with missing essential data
//             const originalCount = filteredData.length;
//             filteredData = filteredData.filter(row => {
//               const isValid = row && 
//                 (row.DOT_NUMBER || row['DOT_NUMBER']) && 
//                 (row.CARRIER_OPERATION || row['CARRIER_OPERATION']);
//               if (!isValid) {
//                 console.log('Invalid row:', row);
//               }
//               return isValid;
//             });

//             console.log(`Starting with ${filteredData.length} valid rows (filtered from ${originalCount} total rows)`);
            
//             if (filteredData.length > 0) {
//               console.log('Sample valid row:', filteredData[0]);
//               console.log('Available columns:', Object.keys(filteredData[0]));
//             }
            
//             // Apply filters
//             if (params.carrierOperation) {
//               const beforeCount = filteredData.length;
//               filteredData = filteredData.filter(row => {
//                 const carrierOp = row.CARRIER_OPERATION || row['CARRIER_OPERATION'];
//                 const match = carrierOp?.toString().toLowerCase() === params.carrierOperation?.toLowerCase();
//                 if (!match && beforeCount < 10) console.log(`Carrier op mismatch: "${carrierOp}" vs "${params.carrierOperation}"`);
//                 return match;
//               });
//               console.log(`After carrier operation filter: ${filteredData.length} (was ${beforeCount})`);
//             }
            
//             if (params.powerUnits !== undefined && params.powerUnits > 0) {
//               const beforeCount = filteredData.length;
//               filteredData = filteredData.filter(row => {
//                 const powerUnits = row.POWER_UNITS || row['POWER_UNITS'];
//                 const parsedPowerUnits = typeof powerUnits === 'number' 
//                   ? powerUnits 
//                   : powerUnits != null 
//                     ? parseInt(powerUnits, 10) 
//                     : 0;
//                 const match = parsedPowerUnits >= params.powerUnits!;
//                 if (!match && beforeCount < 10) console.log(`Power units mismatch: ${parsedPowerUnits} vs ${params.powerUnits}`);
//                 return match;
//               });
//               console.log(`After power units filter: ${filteredData.length} (was ${beforeCount})`);
//             }
            
//             if (params.totalDrivers !== undefined && params.totalDrivers >= 0) {
//               const beforeCount = filteredData.length;
//               filteredData = filteredData.filter(row => {
//                 const totalDrivers = row.TOTAL_DRIVERS || row['TOTAL_DRIVERS'];
//                 const parsedTotalDrivers = typeof totalDrivers === 'number' 
//                   ? totalDrivers 
//                   : totalDrivers != null 
//                     ? parseInt(totalDrivers, 10) 
//                     : 0;
//                 const match = parsedTotalDrivers >= params.totalDrivers!;
//                 if (!match && beforeCount < 10) console.log(`Total drivers mismatch: ${parsedTotalDrivers} vs ${params.totalDrivers}`);
//                 return match;
//               });
//               console.log(`After total drivers filter: ${filteredData.length} (was ${beforeCount})`);
//             }
            
//             if (params.classDef) {
//               const beforeCount = filteredData.length;
//               filteredData = filteredData.filter(row => {
//                 const classDef = row.CLASSDEF || row['CLASSDEF'];
//                 const match = classDef?.toLowerCase().includes(params.classDef?.toLowerCase() || '');
//                 if (!match && beforeCount < 10) console.log(`Class def mismatch: "${classDef}" vs "${params.classDef}"`);
//                 return match;
//               });
//               console.log(`After class definition filter: ${filteredData.length} (was ${beforeCount})`);
//             }
            
//             if (params.state && params.state.trim() !== '') {
//               const beforeCount = filteredData.length;
//               filteredData = filteredData.filter(row => {
//                 const state = row.PHY_STATE || row['PHY_STATE'];
//                 const match = state?.toLowerCase() === params.state?.toLowerCase();
//                 if (!match && beforeCount < 10) console.log(`State mismatch: "${state}" vs "${params.state}"`);
//                 return match;
//               });
//               console.log(`After state filter: ${filteredData.length} (was ${beforeCount})`);
//             }

//             // Limit to 50 rows
//             const limitedData = filteredData.slice(0, 50);
            
//             console.log(`Final result: ${filteredData.length} total matches, returning ${limitedData.length} rows`);
            
//             resolve({
//               count: filteredData.length,
//               data: limitedData
//             });
//           } catch (error) {
//             console.error('Error filtering data:', error);
//             resolve({
//               count: 0,
//               data: [],
//               error: `Error processing filter parameters: ${error instanceof Error ? error.message : 'Unknown error'}`
//             });
//           }
//         },
//         error: (error) => {
//           console.error('Papa parse error:', error);
//           resolve({
//             count: 0,
//             data: [],
//             error: `Failed to parse CSV file: ${error.message || 'Unknown parsing error'}`
//           });
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Service error:', error);
//     return {
//       count: 0,
//       data: [],
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     };
//   }
// }




import Papa from 'papaparse';

export interface CarrierData {
  DOT_NUMBER: string;
  CARRIER_OPERATION: string;
  PHONE: string;
  FAX: string;
  CELL_PHONE: string;
  COMPANY_OFFICER_1: string;
  COMPANY_OFFICER_2: string;
  BUSINESS_ORG_DESC: string;
  TRUCK_UNITS: number;
  POWER_UNITS: number;
  TOTAL_INTRASTATE_DRIVERS: number;
  TOTAL_DRIVERS: number;
  CLASSDEF: string;
  LEGAL_NAME: string;
  DBA_NAME: string;
  PHY_STREET: string;
  PHY_CITY: string;
  PHY_COUNTRY: string;
  PHY_STATE: string;
  PHY_ZIP: string;
  CARRIER_MAILING_STREET: string;
  CARRIER_MAILING_STATE: string;
  CARRIER_MAILING_CITY: string;
  CARRIER_MAILING_COUNTRY: string;
  CARRIER_MAILING_ZIP: string;
  CARRIER_MAILING_CNTY: string;
  EMAIL_ADDRESS: string;
  // Allow for any additional columns that might exist
  [key: string]: any;
}

export interface FilterParams {
  carrierOperation?: string;
  powerUnits?: number;
  totalDrivers?: number;
  classDef?: string;
  state?: string;
}

export interface FilterResponse {
  count: number;
  data: CarrierData[]; // This will be limited to 50 for display
  allData: CarrierData[]; // This will contain all filtered results for CSV export
  error?: string;
}

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export const CARRIER_OPERATIONS = ['A', 'B', 'C'];
export const CLASS_DEFINITIONS = ['AUTHORIZED FOR HIRE', 'PRIVATE PROPERTY', 'EXEMPT FOR HIRE'];

export async function filterCarriers(params: FilterParams): Promise<FilterResponse> {
  try {
    console.log('Filtering carriers with params:', params);
    
    const response = await fetch('./filtered_carrier_data.csv');
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transformHeader: (header: string) => header.trim(),
        transform: (value: string, header: string) => {
          if (typeof value === 'string') {
            return value.trim();
          }
          return value;
        },
        complete: (results) => {
          try {
            console.log('Raw parse results:', {
              data: results.data.slice(0, 2),
              errors: results.errors,
              meta: results.meta
            });

            if (results.errors.length > 0) {
              console.error('CSV parse errors:', results.errors);
              console.warn('Continuing despite parse errors...');
            }

            let filteredData = results.data as CarrierData[];
            console.log(`Raw data length: ${filteredData.length}`);
            console.log('Sample raw row:', filteredData[0]);
            
            // Remove any rows with missing essential data
            const originalCount = filteredData.length;
            filteredData = filteredData.filter(row => {
              const isValid = row && 
                (row.DOT_NUMBER || row['DOT_NUMBER']) && 
                (row.CARRIER_OPERATION || row['CARRIER_OPERATION']);
              if (!isValid) {
                console.log('Invalid row:', row);
              }
              return isValid;
            });

            console.log(`Starting with ${filteredData.length} valid rows (filtered from ${originalCount} total rows)`);
            
            if (filteredData.length > 0) {
              console.log('Sample valid row:', filteredData[0]);
              console.log('Available columns:', Object.keys(filteredData[0]));
            }
            
            // Apply filters
            if (params.carrierOperation) {
              const beforeCount = filteredData.length;
              filteredData = filteredData.filter(row => {
                const carrierOp = row.CARRIER_OPERATION || row['CARRIER_OPERATION'];
                const match = carrierOp?.toString().toLowerCase() === params.carrierOperation?.toLowerCase();
                if (!match && beforeCount < 10) console.log(`Carrier op mismatch: "${carrierOp}" vs "${params.carrierOperation}"`);
                return match;
              });
              console.log(`After carrier operation filter: ${filteredData.length} (was ${beforeCount})`);
            }
            
            if (params.powerUnits !== undefined && params.powerUnits > 0) {
              const beforeCount = filteredData.length;
              filteredData = filteredData.filter(row => {
                const powerUnits = row.POWER_UNITS || row['POWER_UNITS'];
                const parsedPowerUnits = typeof powerUnits === 'number' 
                  ? powerUnits 
                  : powerUnits != null 
                    ? parseInt(powerUnits, 10) 
                    : 0;
                const match = parsedPowerUnits >= params.powerUnits!;
                if (!match && beforeCount < 10) console.log(`Power units mismatch: ${parsedPowerUnits} vs ${params.powerUnits}`);
                return match;
              });
              console.log(`After power units filter: ${filteredData.length} (was ${beforeCount})`);
            }
            
            if (params.totalDrivers !== undefined && params.totalDrivers >= 0) {
              const beforeCount = filteredData.length;
              filteredData = filteredData.filter(row => {
                const totalDrivers = row.TOTAL_DRIVERS || row['TOTAL_DRIVERS'];
                const parsedTotalDrivers = typeof totalDrivers === 'number' 
                  ? totalDrivers 
                  : totalDrivers != null 
                    ? parseInt(totalDrivers, 10) 
                    : 0;
                const match = parsedTotalDrivers >= params.totalDrivers!;
                if (!match && beforeCount < 10) console.log(`Total drivers mismatch: ${parsedTotalDrivers} vs ${params.totalDrivers}`);
                return match;
              });
              console.log(`After total drivers filter: ${filteredData.length} (was ${beforeCount})`);
            }
            
            if (params.classDef) {
              const beforeCount = filteredData.length;
              filteredData = filteredData.filter(row => {
                const classDef = row.CLASSDEF || row['CLASSDEF'];
                const match = classDef?.toLowerCase().includes(params.classDef?.toLowerCase() || '');
                if (!match && beforeCount < 10) console.log(`Class def mismatch: "${classDef}" vs "${params.classDef}"`);
                return match;
              });
              console.log(`After class definition filter: ${filteredData.length} (was ${beforeCount})`);
            }
            
            if (params.state && params.state.trim() !== '') {
              const beforeCount = filteredData.length;
              filteredData = filteredData.filter(row => {
                const state = row.PHY_STATE || row['PHY_STATE'];
                const match = state?.toLowerCase() === params.state?.toLowerCase();
                if (!match && beforeCount < 10) console.log(`State mismatch: "${state}" vs "${params.state}"`);
                return match;
              });
              console.log(`After state filter: ${filteredData.length} (was ${beforeCount})`);
            }

            // Keep all filtered data for CSV export
            const allFilteredData = [...filteredData];
            
            // Limit to 50 rows for display only
            const displayData = filteredData.slice(0, 50);
            
            console.log(`Final result: ${filteredData.length} total matches, returning ${displayData.length} rows for display`);
            
            resolve({
              count: filteredData.length,
              data: displayData, // Limited data for display
              allData: allFilteredData // All filtered data for CSV export
            });
          } catch (error) {
            console.error('Error filtering data:', error);
            resolve({
              count: 0,
              data: [],
              allData: [],
              error: `Error processing filter parameters: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
          }
        },
        error: (error) => {
          console.error('Papa parse error:', error);
          resolve({
            count: 0,
            data: [],
            allData: [],
            error: `Failed to parse CSV file: ${error.message || 'Unknown parsing error'}`
          });
        }
      });
    });
  } catch (error) {
    console.error('Service error:', error);
    return {
      count: 0,
      data: [],
      allData: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Utility function to download CSV with all filtered data
export function downloadFilteredCSV(allData: CarrierData[], filename: string = 'filtered-carriers.csv') {
  if (!allData || allData.length === 0) {
    console.warn('No data to download');
    return;
  }

  try {
    // Convert data to CSV format
    const csv = Papa.unparse(allData, {
      header: true,
      columns: [
        'DOT_NUMBER',
        'CARRIER_OPERATION', 
        'LEGAL_NAME',
        'DBA_NAME',
        'PHONE',
        'FAX',
        'CELL_PHONE',
        'EMAIL_ADDRESS',
        'COMPANY_OFFICER_1',
        'COMPANY_OFFICER_2',
        'BUSINESS_ORG_DESC',
        'TRUCK_UNITS',
        'POWER_UNITS',
        'TOTAL_INTRASTATE_DRIVERS',
        'TOTAL_DRIVERS',
        'CLASSDEF',
        'PHY_STREET',
        'PHY_CITY',
        'PHY_STATE',
        'PHY_ZIP',
        'PHY_COUNTRY',
        'CARRIER_MAILING_STREET',
        'CARRIER_MAILING_CITY',
        'CARRIER_MAILING_STATE',
        'CARRIER_MAILING_ZIP',
        'CARRIER_MAILING_COUNTRY',
        'CARRIER_MAILING_CNTY'
      ]
    });

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log(`Downloaded ${allData.length} records to ${filename}`);
    }
  } catch (error) {
    console.error('Error downloading CSV:', error);
  }
}