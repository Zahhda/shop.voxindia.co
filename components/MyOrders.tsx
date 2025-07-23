import React from 'react';
import { format } from 'date-fns';
import { Package, ChevronRight, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

interface Order {
  id: string;
  date: Date;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: new Date('2024-03-15'),
    status: 'delivered',
    total: 129.99,
    items: [
      {
        id: '1',
        name: 'Wireless Headphones',
        quantity: 1,
        price: 79.99,
        image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      {
        id: '2',
        name: 'Phone Case',
        quantity: 2,
        price: 24.99,
        image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: new Date('2024-03-10'),
    status: 'shipped',
    total: 89.99,
    items: [
      {
        id: '3',
        name: 'Smart Watch Band',
        quantity: 1,
        price: 89.99,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    ]
  }
];

const statusColors = {
  processing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const statusIcons = {
  processing: <Package size={16} className="text-yellow-600" />,
  shipped: <Truck size={16} className="text-blue-600" />,
  delivered: <CheckCircle2 size={16} className="text-green-600" />,
  cancelled: <AlertCircle size={16} className="text-red-600" />
};

const MyOrders: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>
        
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 border-b">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="font-medium">
                      {format(order.date, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Order number</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total amount</p>
                    <p className="font-medium">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Status</p>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="divide-y">
                {order.items.map(item => (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="bg-gray-50 p-4 border-t">
                <div className="flex justify-end gap-3">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                    View Order Details
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;