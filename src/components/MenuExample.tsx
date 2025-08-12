import React from 'react';
import { useMenu } from '../hooks/useMenu';

const MenuDisplay: React.FC = () => {
  const { categories, loading, error } = useMenu();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '200px',
        fontSize: '18px',
        color: '#666'
      }}>
        Cargando menú...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        color: '#d32f2f', 
        padding: '20px',
        fontSize: '16px'
      }}>
        Error al cargar el menú: {error}
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: '#333',
        fontSize: '2.5rem'
      }}>
        Nuestro Menú
      </h1>

      {categories.map((category) => (
        <div key={category.name} style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            color: '#2c5aa0',
            borderBottom: '2px solid #2c5aa0',
            paddingBottom: '10px',
            marginBottom: '20px',
            fontSize: '1.8rem'
          }}>
            {category.name}
          </h2>

          <div style={{ 
            display: 'grid', 
            gap: '20px'
          }}>
            {category.items
              .filter(item => item.available) // Solo mostrar items disponibles
              .map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '15px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  gap: '15px'
                }}
              >
                {/* Image */}
                {item.imageUrl && item.imageUrl.trim() !== '' && (
                  <div style={{
                    flexShrink: 0,
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f0f0f0'
                  }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        // Hide the entire image container if it fails to load
                        const container = (e.target as HTMLImageElement).parentElement;
                        if (container) {
                          container.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                )}
                
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ 
                    margin: '0 0 8px 0',
                    color: '#333',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                    {item.name}
                  </h3>
                  {item.description && item.description !== 'Sin descripción disponible' && (
                    <p style={{ 
                      margin: '0 0 12px 0',
                      color: '#666',
                      lineHeight: '1.4',
                      fontSize: '0.95rem'
                    }}>
                      {item.description}
                    </p>
                  )}
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.4rem',
                      color: '#2c5aa0'
                    }}>
                      ${item.price.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {categories.length === 0 && !loading && (
        <p style={{ 
          textAlign: 'center', 
          color: '#666',
          fontSize: '18px',
          marginTop: '50px'
        }}>
          No hay elementos en el menú disponibles en este momento.
        </p>
      )}
    </div>
  );
};

export default MenuDisplay;
