import { Order, WhatsAppMessage } from '@/types';

// Mock WhatsApp Integration
export class WhatsAppService {
  static async sendMessage(to: string, message: string, type: WhatsAppMessage['type']): Promise<WhatsAppMessage> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const whatsappMessage: WhatsAppMessage = {
      to,
      message,
      type,
      sentAt: new Date().toISOString(),
      status: 'sent',
    };

    // Simulate message delivery after 2 seconds
    setTimeout(() => {
      whatsappMessage.status = 'delivered';
    }, 2000);

    console.log('📱 WhatsApp Message Sent:', whatsappMessage);
    return whatsappMessage;
  }

  static formatOrderConfirmation(order: Order, customerPhone: string): string {
    const items = order.items.map(item =>
      `• ${item.productName} x${item.quantity} - ₹${item.total}`
    ).join('\n');

    return `🛒 *Order Confirmation*
Order ID: #${order.id}

${items}

💰 Total: ₹${order.total}
Payment: ${order.paymentMethod.toUpperCase()}

Thank you for your purchase!
- किराना डिजिटल`;
  }

  static formatStockAlert(productName: string, currentStock: number): string {
    return `⚠️ *Stock Alert*

${productName}
Current Stock: ${currentStock} units

कृपया अर्डर दिनुहोस्।
Please reorder soon.

- Kirana Digital`;
  }

  static formatPaymentReminder(customerName: string, amount: number): string {
    return `💳 *Payment Reminder*

Dear ${customerName},

Outstanding Amount: ₹${amount}

कृपया भुक्तानी गर्नुहोस्।
Please make payment.

Thank you!
- किराना डिजिटल`;
  }

  static formatReorderSuggestion(productName: string, quantity: number, supplierPhone?: string): string {
    let message = `📦 *Smart Reorder Suggestion*

Product: ${productName}
Recommended Order: ${quantity} units

Based on AI sales prediction.`;

    if (supplierPhone) {
      message += `\n\nSupplier: ${supplierPhone}`;
    }

    message += '\n\n- Kirana Digital AI';
    return message;
  }
}

// Mock Payment Gateway Integration
export class PaymentService {
  static async processPayment(
    amount: number,
    method: 'esewa' | 'khalti' | 'bank' | 'connectips'
  ): Promise<{ success: boolean; transactionId: string; message: string }> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 95% success rate simulation
    const success = Math.random() > 0.05;

    if (success) {
      return {
        success: true,
        transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        message: `Payment of ₹${amount} successful via ${method.toUpperCase()}`,
      };
    } else {
      return {
        success: false,
        transactionId: '',
        message: 'Payment failed. Please try again.',
      };
    }
  }

  static getPaymentInstructions(method: string, amount: number): string {
    switch (method) {
      case 'esewa':
        return `eSewa Payment Instructions:
1. Open eSewa app
2. Scan QR code or enter Merchant ID: KIRANA123
3. Enter amount: ₹${amount}
4. Complete payment`;

      case 'khalti':
        return `Khalti Payment Instructions:
1. Open Khalti app
2. Select 'Pay to Merchant'
3. Enter Merchant Code: KRN456
4. Amount: ₹${amount}`;

      case 'bank':
        return `Bank Transfer Instructions:
Account Name: Kirana Digital
Account No: 0123456789
Bank: Nepal Bank Ltd
Amount: ₹${amount}`;

      case 'connectips':
        return `ConnectIPS Instructions:
1. Login to your bank app
2. Select ConnectIPS
3. Merchant ID: KIRANA789
4. Amount: ₹${amount}`;

      default:
        return 'Payment instructions not available';
    }
  }

  static async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Refund processed: ${transactionId} - ₹${amount}`);
    return true;
  }
}

// Voice Alert Service (Text-to-Speech mock)
export class VoiceAlertService {
  static playAlert(message: string, language: 'nepali' | 'english' = 'nepali'): void {
    // In a real implementation, this would use Web Speech API
    console.log(`🔊 Voice Alert (${language}):`, message);

    // Create a visual notification instead
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Payment Received', { body: message });
      }
    }
  }

  static formatPaymentAlert(method: string, amount: number, language: 'nepali' | 'english' = 'nepali'): string {
    if (language === 'nepali') {
      return `${method} बाट रु ${amount} भुक्तानी प्राप्त भयो`;
    } else {
      return `Payment of Rs ${amount} received via ${method}`;
    }
  }

  static formatStockAlert(productName: string, stock: number, language: 'nepali' | 'english' = 'nepali'): string {
    if (language === 'nepali') {
      return `सावधान! ${productName} को स्टक कम छ। बाँकी: ${stock}`;
    } else {
      return `Alert! ${productName} stock is low. Remaining: ${stock}`;
    }
  }
}

// Barcode Scanner Service (Mock)
export class BarcodeScannerService {
  static async scan(): Promise<string | null> {
    // In real implementation, this would use camera/scanner hardware
    // For demo, we'll return a random barcode from sample products
    const sampleBarcodes = ['8901234567890', '8901234567891'];
    await new Promise(resolve => setTimeout(resolve, 1000));

    return sampleBarcodes[Math.floor(Math.random() * sampleBarcodes.length)];
  }

  static isValidBarcode(code: string): boolean {
    // Simple validation - should be 13 digits for EAN-13
    return /^\d{13}$/.test(code);
  }
}
