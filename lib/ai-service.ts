import { Product, Order, SalesPrediction } from '@/types';

// Mock AI service that simulates intelligent predictions
export class AIService {
  // Analyze sales patterns and predict demand
  static predictDemand(products: Product[], orders: Order[]): SalesPrediction[] {
    const predictions: SalesPrediction[] = [];

    products.forEach(product => {
      // Calculate historical sales
      const productSales = orders
        .flatMap(order => order.items)
        .filter(item => item.productId === product.id);

      const totalSold = productSales.reduce((sum, item) => sum + item.quantity, 0);
      const avgDailySales = totalSold / Math.max(orders.length, 7); // Last 7 days average

      // Predict next 7 days demand
      const predictedDemand = Math.ceil(avgDailySales * 7 * 1.2); // 20% buffer
      const daysUntilStockout = product.stock / (avgDailySales || 1);
      const recommendedOrder = Math.max(0, product.maxStock - product.stock);

      // Generate reasoning
      const reasoning: string[] = [];

      if (product.stock <= product.minStock) {
        reasoning.push(`स्टक न्यून छ (Stock critically low: ${product.stock} ${product.unit})`);
      }

      if (daysUntilStockout < 3 && avgDailySales > 0) {
        reasoning.push(`${Math.ceil(daysUntilStockout)} दिनमा स्टक सकिनेछ (Will run out in ${Math.ceil(daysUntilStockout)} days)`);
      }

      if (avgDailySales > 0) {
        reasoning.push(`दैनिक औसत बिक्री: ${avgDailySales.toFixed(1)} ${product.unit} (Daily avg: ${avgDailySales.toFixed(1)})`);
      } else {
        reasoning.push('कुनै बिक्री इतिहास छैन (No sales history)');
      }

      // Check if it's a fast-moving item
      if (avgDailySales > 3) {
        reasoning.push('उच्च माग भएको वस्तु (High demand item)');
      }

      // Seasonal patterns (mock - based on day of week)
      const dayOfWeek = new Date().getDay();
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        reasoning.push('सप्ताहन्तमा बढी बिक्री (Higher weekend sales expected)');
      }

      const confidence = Math.min(95, Math.max(60, 75 + (orders.length * 2)));

      predictions.push({
        productId: product.id,
        productName: product.name,
        predictedDemand,
        currentStock: product.stock,
        recommendedOrder,
        confidence,
        reasoning,
      });
    });

    // Sort by urgency (low stock first)
    return predictions.sort((a, b) => {
      const urgencyA = a.currentStock / (a.predictedDemand || 1);
      const urgencyB = b.currentStock / (b.predictedDemand || 1);
      return urgencyA - urgencyB;
    });
  }

  // Smart reorder suggestions
  static getReorderSuggestions(products: Product[], orders: Order[]): SalesPrediction[] {
    const predictions = this.predictDemand(products, orders);

    // Only return items that need reordering
    return predictions.filter(pred => {
      const product = products.find(p => p.id === pred.productId);
      return product && (
        product.stock <= product.minStock ||
        pred.currentStock < pred.predictedDemand
      );
    });
  }

  // Analyze best selling products
  static getBestSellers(orders: Order[], limit: number = 5) {
    const productSales: Record<string, { name: string; quantity: number; revenue: number }> = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = {
            name: item.productName,
            quantity: 0,
            revenue: 0,
          };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.total;
      });
    });

    return Object.entries(productSales)
      .map(([id, data]) => ({ productId: id, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);
  }

  // Smart price optimization suggestions
  static getPricingInsights(product: Product, orders: Order[]) {
    const productOrders = orders.filter(order =>
      order.items.some(item => item.productId === product.id)
    );

    const totalSold = productOrders
      .flatMap(order => order.items)
      .filter(item => item.productId === product.id)
      .reduce((sum, item) => sum + item.quantity, 0);

    const suggestions: string[] = [];

    if (totalSold > 100) {
      suggestions.push('High demand - consider 5-10% price increase');
    } else if (totalSold < 10 && orders.length > 20) {
      suggestions.push('Low demand - consider promotional discount');
    }

    if (product.stock > product.maxStock * 0.8) {
      suggestions.push('Overstocked - clear with discount offer');
    }

    return suggestions;
  }

  // Predict optimal reorder timing
  static getOptimalReorderDate(product: Product, orders: Order[]): Date {
    const productSales = orders
      .flatMap(order => order.items)
      .filter(item => item.productId === product.id);

    const avgDailySales = productSales.reduce((sum, item) => sum + item.quantity, 0) / Math.max(orders.length, 7);
    const daysUntilStockout = product.stock / (avgDailySales || 1);

    // Reorder 3 days before expected stockout
    const reorderDate = new Date();
    reorderDate.setDate(reorderDate.getDate() + Math.max(0, daysUntilStockout - 3));

    return reorderDate;
  }
}
