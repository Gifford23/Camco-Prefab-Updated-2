import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPriceFromUSD } from "@/lib/formatters";

// Define the interface locally to avoid dependency on the old mock file
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  squareFeet?: number;
  leadTime?: string;
}

interface OrderSummaryProps {
  product: Product;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return formatPriceFromUSD(price);
  };

  return (
    <Card className="sticky top-24 border-blue-100 shadow-md">
      <CardHeader className="bg-blue-50/50 pb-4">
        <CardTitle className="text-xl text-blue-900">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight mb-1">
              {product.name}
            </h3>
            {product.squareFeet ? (
              <p className="text-sm text-gray-500 mb-1">
                {product.squareFeet} sq ft
              </p>
            ) : null}
            <p className="text-blue-600 font-bold">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Quantity</span>
            <span className="font-medium text-gray-900">1</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (Estimate)</span>
            <span className="font-medium text-gray-900">$0.00</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between font-bold text-lg text-gray-900">
          <span>Total</span>
          <span className="text-blue-700">{formatPrice(product.price)}</span>
        </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800 flex items-center gap-2">
            <span className="font-semibold">Estimated Lead Time:</span>
            {product.leadTime || "4-6 weeks"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
