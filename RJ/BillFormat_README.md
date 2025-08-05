# Bill Format Component for React Native

This component creates an exact replica of the bill format shown in your image with proper table structure, spacing, and layout.

## Features

- **Exact Table Format**: Matches the original bill layout with proper column widths and spacing
- **Responsive Design**: Uses percentage-based widths for better screen compatibility
- **TypeScript Support**: Fully typed interfaces for better development experience
- **Customizable Data**: Easy to modify bill details, items, and totals
- **Scrollable**: Handles long bills with scroll capability

## Files Created

1. `BillFormat.tsx` - Main bill component
2. `BillScreen.tsx` - Sample usage screen
3. `BillFormat_README.md` - This documentation file

## Usage

### Basic Implementation

```tsx
import React from 'react';
import { View } from 'react-native';
import BillFormat from './screens/BillFormat';

const MyBillScreen = () => {
  const billData = {
    billNo: "G-2020446340",
    date: "31-Jul-2020",
    phone: "",
    address: "",
    items: [
      {
        code: "JHJ",
        description: "Urban",
        designMtr: "2.95",
        alt: "0.00[1-2.00][1]",
        roll: "2600 mtr[26x100]",
        rollMtr: "",
        mRate: "14.5",
        fold: "",
        totalMtr: "26.00[2.95]",
        amount: "377.00"
      }
    ],
    totalAmount: "8524.18[10796.00]"
  };

  return (
    <View style={{ flex: 1 }}>
      <BillFormat {...billData} />
    </View>
  );
};
```

### Data Structure

#### BillItem Interface
```tsx
interface BillItem {
  code: string;           // Item code (e.g., "JHJ")
  description: string;    // Item description (e.g., "Urban")
  designMtr: string;      // Design meter value
  alt: string;           // Alternative values
  roll: string;          // Roll information
  rollMtr: string;       // Roll meter (can be empty)
  mRate: string;         // Market rate
  fold: string;          // Fold information (can be empty)
  totalMtr: string;      // Total meter calculation
  amount: string;        // Item amount
}
```

#### Props Interface
```tsx
interface BillFormatProps {
  billNo?: string;        // Bill number
  date?: string;          // Bill date
  phone?: string;         // Phone number
  address?: string;       // Address
  items?: BillItem[];     // Array of bill items
  totalAmount?: string;   // Total bill amount
}
```

### Customization

#### Adding Multiple Items
```tsx
const multipleItems = [
  {
    code: "JHJ",
    description: "Urban",
    designMtr: "2.95",
    alt: "0.00[1-2.00][1]",
    roll: "2600 mtr[26x100]",
    rollMtr: "",
    mRate: "14.5",
    fold: "",
    totalMtr: "26.00[2.95]",
    amount: "377.00"
  },
  {
    code: "ABC",
    description: "Cotton",
    designMtr: "3.50",
    alt: "0.00[2-3.00][2]",
    roll: "3000 mtr[30x100]",
    rollMtr: "",
    mRate: "16.0",
    fold: "",
    totalMtr: "30.00[3.50]",
    amount: "480.00"
  }
];

<BillFormat 
  billNo="G-2020446341"
  date="01-Aug-2020"
  items={multipleItems}
  totalAmount="857.00"
/>
```

#### Styling Modifications

You can modify the styles in the `StyleSheet` section of `BillFormat.tsx`:

- **Table cell widths**: Adjust percentage values in `TableHeader` and `TableRow`
- **Font sizes**: Modify `fontSize` properties in various text styles
- **Colors**: Change `color` and `borderColor` properties
- **Spacing**: Adjust `padding`, `margin`, and `borderWidth` values

#### Key Style Properties
```tsx
// For adjusting column widths
{ width: '8%' }  // Adjust percentage as needed

// For text styling
fontSize: 10,    // Adjust font size
fontWeight: 'bold',
color: '#000',

// For borders and spacing
borderWidth: 1,
borderColor: '#000',
paddingVertical: 6,
```

## Column Structure

The table follows this exact column structure from the image:

1. **Code** (8%) - Item code
2. **Description** (12%) - Item description  
3. **Design** (8%) - Design value
4. **Mtr** (6%) - Meter (usually empty)
5. **Alt** (8%) - Alternative values
6. **Roll** (15%) - Roll information
7. **Roll Mtr** (8%) - Roll meter
8. **M.Rate** (8%) - Market rate
9. **Fold** (6%) - Fold information
10. **Total Mtr** (12%) - Total meter calculation
11. **Amount** (9%) - Item amount

## Features Matching the Original

✅ **Header Section**: Company name and bill details
✅ **Party Details**: Phone and address section
✅ **Table Structure**: Exact column layout with borders
✅ **Empty Rows**: Maintains table structure with empty rows
✅ **Total Section**: Summary with calculations
✅ **Footer**: Rs. Only and NET AMOUNT sections
✅ **Borders**: Complete border structure matching the image
✅ **Typography**: Appropriate font sizes and weights
✅ **Spacing**: Proper padding and margins

## Integration in Your App

Add this to your navigation stack or use directly in any screen:

```tsx
// In your navigation setup
import BillScreen from './screens/BillScreen';

// Or use directly
import BillFormat from './screens/BillFormat';
```

## Dependencies Used

The component uses only React Native core components:
- View
- Text
- StyleSheet
- ScrollView
- Dimensions
- SafeAreaView (in sample screen)
- StatusBar (in sample screen)

No additional third-party dependencies are required for the basic functionality.