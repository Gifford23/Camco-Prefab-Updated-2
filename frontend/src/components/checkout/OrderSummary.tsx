import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/data/products";
import { formatPriceFromUSD } from "@/lib/formatters";

interface OrderSummaryProps {
  product: Product;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return formatPriceFromUSD(price);
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-16 w-16 rounded overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.squareFeet} sq ft</p>
            <p className="text-blue-600 font-semibold">{formatPrice(product.price)}</p>
          </div>
        </div>
        
        <div className="space-y-3 border-t pt-4 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(product.price)}</span>
          </div>
          <div className="flex justify-between">
            <span>Quantity</span>
            <span>1</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>Calculated at completion</span>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span className="text-blue-600">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Lead Time:</strong> {product.leadTime || '6-8 weeks'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
