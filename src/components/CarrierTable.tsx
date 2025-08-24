// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { ChevronLeft, ChevronRight, TrendingUp, Users, Truck } from 'lucide-react';
// import { type CarrierData } from '@/services/carrierService';

// interface CarrierTableProps {
//   data: CarrierData[];
// }

// export const CarrierTable: React.FC<CarrierTableProps> = ({ data }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 50;
//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = data.slice(startIndex, endIndex);

//   const goToNextPage = () => {
//     setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   };

//   const goToPrevPage = () => {
//     setCurrentPage(prev => Math.max(prev - 1, 1));
//   };

//   if (data.length === 0) {
//     return null;
//   }

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="rounded-xl border border-border/50 overflow-hidden glass-effect shadow-glass">
//         <Table>
//           <TableHeader>
//             <TableRow className="border-border/50 hover:bg-transparent">
//               <TableHead className="font-semibold text-foreground">
//                 <div className="flex items-center space-x-2">
//                   <TrendingUp className="h-4 w-4 text-primary" />
//                   <span>Carrier Operation</span>
//                 </div>
//               </TableHead>
//               <TableHead className="font-semibold text-foreground text-right">
//                 <div className="flex items-center justify-end space-x-2">
//                   <Truck className="h-4 w-4 text-accent" />
//                   <span>Power Units</span>
//                 </div>
//               </TableHead>
//               <TableHead className="font-semibold text-foreground text-right">
//                 <div className="flex items-center justify-end space-x-2">
//                   <Users className="h-4 w-4 text-accent" />
//                   <span>Total Drivers</span>
//                 </div>
//               </TableHead>
//               <TableHead className="font-semibold text-foreground">Class Definition</TableHead>
//               <TableHead className="font-semibold text-foreground">State</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentData.map((carrier, index) => (
//               <TableRow 
//                 key={startIndex + index} 
//                 className="border-border/50 hover:bg-accent/5 transition-all duration-300 hover:shadow-sm animate-fade-in"
//                 style={{ animationDelay: `${index * 50}ms` }}
//               >
//                 <TableCell className="font-medium">
//                   <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                     carrier.CARRIER_OP === 'Interstate' 
//                       ? 'bg-primary/10 text-primary border border-primary/20' 
//                       : 'bg-accent/10 text-accent border border-accent/20'
//                   }`}>
//                     {carrier.CARRIER_OP}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-right font-mono font-medium">{carrier.POWER_UNITS.toLocaleString()}</TableCell>
//                 <TableCell className="text-right font-mono font-medium">{carrier.TOTAL_DRIVERS.toLocaleString()}</TableCell>
//                 <TableCell>
//                   <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                     carrier.CLASS_DEF === 'For-hire' 
//                       ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
//                       : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
//                   }`}>
//                     {carrier.CLASS_DEF}
//                   </span>
//                 </TableCell>
//                 <TableCell>
//                   <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary/50 text-foreground border border-border/50">
//                     {carrier.STATE}
//                   </span>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {totalPages > 1 && (
//         <div className="flex items-center justify-between p-4 glass-effect rounded-xl border border-border/50 animate-fade-in [animation-delay:300ms]">
//           <div className="text-sm text-muted-foreground">
//             Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{' '}
//             <span className="font-medium text-foreground">{Math.min(endIndex, data.length)}</span> of{' '}
//             <span className="font-medium text-foreground">{data.length}</span> results
//           </div>
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={goToPrevPage}
//               disabled={currentPage === 1}
//               className="glass-effect hover:shadow-accent transition-all duration-300 disabled:opacity-50"
//             >
//               <ChevronLeft className="h-4 w-4 mr-1" />
//               Previous
//             </Button>
            
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-muted-foreground">Page</span>
//               <span className="font-medium px-3 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
//                 {currentPage}
//               </span>
//               <span className="text-sm text-muted-foreground">of {totalPages}</span>
//             </div>
            
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={goToNextPage}
//               disabled={currentPage === totalPages}
//               className="glass-effect hover:shadow-accent transition-all duration-300 disabled:opacity-50"
//             >
//               Next
//               <ChevronRight className="h-4 w-4 ml-1" />
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, Users, Truck, Building, Phone, Mail, MapPin, User, FileText, Hash } from 'lucide-react';
import { type CarrierData } from '@/services/carrierService';

interface CarrierTableProps {
  data: CarrierData[];
}

// Define column configurations with icons and formatting
const getColumnConfig = () => [
  { key: 'DOT_NUMBER', header: 'DOT Number', icon: Hash, align: 'left' as const, type: 'text' },
  { key: 'CARRIER_OPERATION', header: 'Carrier Op', icon: TrendingUp, align: 'center' as const, type: 'badge' },
  { key: 'LEGAL_NAME', header: 'Legal Name', icon: Building, align: 'left' as const, type: 'text' },
  { key: 'DBA_NAME', header: 'DBA Name', icon: Building, align: 'left' as const, type: 'text' },
  { key: 'PHONE', header: 'Phone', icon: Phone, align: 'left' as const, type: 'text' },
  { key: 'FAX', header: 'Fax', icon: Phone, align: 'left' as const, type: 'text' },
  { key: 'CELL_PHONE', header: 'Cell Phone', icon: Phone, align: 'left' as const, type: 'text' },
  { key: 'EMAIL_ADDRESS', header: 'Email', icon: Mail, align: 'left' as const, type: 'email' },
  { key: 'COMPANY_OFFICER_1', header: 'Officer 1', icon: User, align: 'left' as const, type: 'text' },
  { key: 'COMPANY_OFFICER_2', header: 'Officer 2', icon: User, align: 'left' as const, type: 'text' },
  { key: 'BUSINESS_ORG_DESC', header: 'Business Type', icon: FileText, align: 'left' as const, type: 'badge' },
  { key: 'TRUCK_UNITS', header: 'Truck Units', icon: Truck, align: 'right' as const, type: 'number' },
  { key: 'POWER_UNITS', header: 'Power Units', icon: Truck, align: 'right' as const, type: 'number' },
  { key: 'TOTAL_INTRASTATE_DRIVERS', header: 'Intrastate Drivers', icon: Users, align: 'right' as const, type: 'number' },
  { key: 'TOTAL_DRIVERS', header: 'Total Drivers', icon: Users, align: 'right' as const, type: 'number' },
  { key: 'CLASSDEF', header: 'Class Definition', icon: FileText, align: 'left' as const, type: 'badge' },
  { key: 'PHY_STREET', header: 'Street', icon: MapPin, align: 'left' as const, type: 'text' },
  { key: 'PHY_CITY', header: 'City', icon: MapPin, align: 'left' as const, type: 'text' },
  { key: 'PHY_STATE', header: 'State', icon: MapPin, align: 'center' as const, type: 'badge' },
  { key: 'PHY_ZIP', header: 'ZIP', icon: MapPin, align: 'left' as const, type: 'text' },
  { key: 'PHY_COUNTRY', header: 'Country', icon: MapPin, align: 'center' as const, type: 'badge' },
  { key: 'CARRIER_MAILING_STREET', header: 'Mailing Street', icon: Mail, align: 'left' as const, type: 'text' },
  { key: 'CARRIER_MAILING_CITY', header: 'Mailing City', icon: Mail, align: 'left' as const, type: 'text' },
  { key: 'CARRIER_MAILING_STATE', header: 'Mailing State', icon: Mail, align: 'center' as const, type: 'badge' },
  { key: 'CARRIER_MAILING_ZIP', header: 'Mailing ZIP', icon: Mail, align: 'left' as const, type: 'text' },
  { key: 'CARRIER_MAILING_COUNTRY', header: 'Mailing Country', icon: Mail, align: 'center' as const, type: 'badge' },
  { key: 'CARRIER_MAILING_CNTY', header: 'Mailing County', icon: MapPin, align: 'left' as const, type: 'text' },
];

export const CarrierTable: React.FC<CarrierTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Get dynamic columns based on available data
  const availableColumns = getColumnConfig().filter(col => {
    // Check if this column exists in the data and has some non-empty values
    return data.some(row => row[col.key as keyof CarrierData] != null && row[col.key as keyof CarrierData] !== '');
  });

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const formatCellValue = (value: any, type: string) => {
    if (value == null || value === '') return '-';

    switch (type) {
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'email':
        return value ? (
          <a href={`mailto:${value}`} className="text-primary hover:underline">
            {value}
          </a>
        ) : '-';
      case 'badge':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            {value}
          </span>
        );
      default:
        return value;
    }
  };

  const getCellClassName = (align: string, type: string) => {
    let baseClass = '';
    
    switch (align) {
      case 'right':
        baseClass = 'text-right';
        break;
      case 'center':
        baseClass = 'text-center';
        break;
      default:
        baseClass = 'text-left';
    }

    if (type === 'number') {
      baseClass += ' font-mono font-medium';
    }

    return baseClass;
  };

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-xl border border-border/50 overflow-hidden glass-effect shadow-glass">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                {availableColumns.map((col) => {
                  const Icon = col.icon;
                  const alignClass = col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start';
                  
                  return (
                    <TableHead key={col.key} className={`font-semibold text-foreground ${getCellClassName(col.align, col.type)} min-w-[120px]`}>
                      <div className={`flex items-center space-x-2 ${alignClass}`}>
                        <Icon className="h-4 w-4 text-primary" />
                        <span>{col.header}</span>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((carrier, index) => (
                <TableRow 
                  key={startIndex + index} 
                  className="border-border/50 hover:bg-accent/5 transition-all duration-300 hover:shadow-sm animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {availableColumns.map((col) => (
                    <TableCell 
                      key={col.key} 
                      className={`${getCellClassName(col.align, col.type)} max-w-[200px] truncate`}
                      title={String(carrier[col.key as keyof CarrierData] || '')}
                    >
                      {formatCellValue(carrier[col.key as keyof CarrierData], col.type)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 glass-effect rounded-xl border border-border/50 animate-fade-in [animation-delay:300ms]">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-foreground">{Math.min(endIndex, data.length)}</span> of{' '}
            <span className="font-medium text-foreground">{data.length}</span> results
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="glass-effect hover:shadow-accent transition-all duration-300 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Page</span>
              <span className="font-medium px-3 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
                {currentPage}
              </span>
              <span className="text-sm text-muted-foreground">of {totalPages}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="glass-effect hover:shadow-accent transition-all duration-300 disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};