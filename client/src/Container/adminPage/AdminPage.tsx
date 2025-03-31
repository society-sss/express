import React, { useEffect } from 'react';
import './adminPage.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteOrder, fetchOrders, updateOrderStatus } from '../../store/admin/adminThunks';
import { OrderProps } from '../../types';
import { clearSelectedOrder, setSelectedOrder } from '../../store/admin/adminSlice';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { 
    orders, 
    loading, 
    error, 
    selectedOrder 
  } = useAppSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await dispatch(updateOrderStatus({ id: orderId, status: newStatus })).unwrap();
      dispatch(fetchOrders());
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const openOrderDetails = (order: OrderProps) => {
    dispatch(setSelectedOrder(order));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(clearSelectedOrder());
    setIsModalOpen(false);
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await dispatch(deleteOrder(orderId)).unwrap();
      dispatch(fetchOrders());
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  if (loading) return <div className="loading">Загрузка заказов...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Панель управления заказами</h1>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя клиента</th>
              <th>Телефон</th>
              <th>Адрес</th>
              <th>Фото</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice()
              .sort((a, b) => parseInt(b.id) - parseInt(a.id))
              .map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.locationAuserName}</td>
                <td>{order.locationAuserPhone}</td>
                <td>{order.locationAuserLocation}</td>
                <td>
                  {order.locationAuserImage && (
                    <img 
                      src={'http://localhost:5000' + order.locationAuserImage} 
                      alt="Фото заказа" 
                      className="order-image"
                      onClick={() => openOrderDetails(order)}
                    />
                  )}
                </td>
                <td>
                  <select 
                    value={order.status || 'pending'} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Ожидает</option>
                    <option value="accepted">Принят</option>
                    <option value="shipped">Отправлен</option>
                    <option value="delivered">Доставлен</option>
                    <option value="cancelled">Отменен</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="action-btn view-btn"
                    onClick={() => openOrderDetails(order)}
                  >
                    Просмотр
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <h2>Детали заказа #{selectedOrder.id}</h2>
            
            <div className="order-details-grid">
              <div className="detail-item">
                <span className="detail-label">Имя отправителя:</span>
                <span className="detail-value">{selectedOrder.locationAuserName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Имя получателя:</span>
                <span className="detail-value">{selectedOrder.locationBuserName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Телефон отправителя:</span>
                <span className="detail-value">{selectedOrder.locationAuserPhone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Телефон получателя:</span>
                <span className="detail-value">{selectedOrder.locationBuserPhone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Откуда забрать посылку:</span>
                <span className="detail-value">{selectedOrder.locationAuserLocation}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Куда доставить посылку:</span>
                <span className="detail-value">{selectedOrder.locationBuserLocation}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">С какого региона забрать посылку:</span>
                <span className="detail-value">{selectedOrder.locationAuserRegion}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">В какой регион доставить посылку:</span>
                <span className="detail-value">{selectedOrder.locationBuserRegion}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Статус:</span>
                <span className="detail-value">
                  <select 
                    value={selectedOrder.status || 'pending'} 
                    onChange={(e) => {
                      handleStatusChange(selectedOrder.id, e.target.value);
                      dispatch(setSelectedOrder({
                        ...selectedOrder,
                        status: e.target.value
                      }));
                    }}
                    className="status-select"
                  >
                    <option value="pending">Ожидает</option>
                    <option value="accepted">Принят</option>
                    <option value="shipped">Отправлен</option>
                    <option value="delivered">Доставлен</option>
                    <option value="cancelled">Отменен</option>
                  </select>
                </span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Фото посылки:</span>
                {selectedOrder.locationAuserImage && (
                  <img 
                    src={'http://localhost:5000' + selectedOrder.locationAuserImage} 
                    alt="Фото заказа" 
                    className="order-image-large"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;