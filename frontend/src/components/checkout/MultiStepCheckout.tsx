
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { useOrders } from "@/context/OrderContext";
import { useCheckoutState } from "@/hooks/useCheckoutState";
import { isStepValid } from "@/utils/checkoutValidation";
import { OrderStatus, PaymentStatus } from "@/data/orders";
import CustomerInfoStep from "./steps/CustomerInfoStep";
import PaymentStep from "./steps/PaymentStep";
import ContractStep from "./steps/ContractStep";
import OrderSummary from "./OrderSummary";
import CheckoutSteps from "./CheckoutSteps";
import CheckoutNavigation from "./CheckoutNavigation";

type MultiStepCheckoutProps = {
  product?: any;
};

const MultiStepCheckout = ({ product }: MultiStepCheckoutProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addNewOrder } = useOrders();
  
  const {
    currentStep,
    customerInfo,
    paymentInfo,
    contractInfo,
    handleCustomerInfoChange,
    handlePaymentInfoChange,
    handleContractInfoChange,
    handleNext,
    handlePrevious
  } = useCheckoutState();

  // Get product from URL params if not provided as prop
  const currentProduct = product || (id ? products.find(p => p.id === parseInt(id)) : null);

  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  const steps = [
    { number: 1, title: "Customer Information", description: "Personal and delivery details" },
    { number: 2, title: "Payment & Location", description: "Upload documents and location" },
    { number: 3, title: "Contract & Finalize", description: "Review and sign contract" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleOrderSubmit = () => {
    const orderData = {
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      email: customerInfo.email,
      address: customerInfo.address1,
      city: customerInfo.city,
      state: customerInfo.state,
      zipCode: customerInfo.postalCode,
    };

    const newOrder = addNewOrder({
      customerId: orderData.email,
      customerName: `${orderData.firstName} ${orderData.lastName}`,
      customerEmail: orderData.email,
      products: [{ productId: currentProduct.id, quantity: 1 }],
      status: "Pending" as OrderStatus,
      paymentStatus: "Pending" as PaymentStatus,
      totalAmount: currentProduct.price,
    });

    toast({
      title: "Order placed successfully!",
      description: `Order #${newOrder.id} has been created. You will receive a confirmation email shortly.`,
    });
    navigate('/order-history');
  };

  const stepValid = isStepValid(currentStep, customerInfo, paymentInfo, contractInfo);

  return (
    <div className="container py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle>Checkout Process</CardTitle>
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              <CheckoutSteps currentStep={currentStep} steps={steps} />
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <CustomerInfoStep
                  customerInfo={customerInfo}
                  onChange={handleCustomerInfoChange}
                />
              )}
              {currentStep === 2 && (
                <PaymentStep
                  paymentInfo={paymentInfo}
                  onChange={handlePaymentInfoChange}
                  product={currentProduct}
                />
              )}
              {currentStep === 3 && (
                <ContractStep
                  contractInfo={contractInfo}
                  onChange={handleContractInfoChange}
                  customerInfo={customerInfo}
                  product={currentProduct}
                />
              )}

              <CheckoutNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                isStepValid={stepValid}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleOrderSubmit}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary product={currentProduct} />
        </div>
      </div>
    </div>
  );
};

export default MultiStepCheckout;
