import React from 'react';
import { useMenu } from '../hooks/useMenu';

const MenuDisplay: React.FC = () => {
  const { categories, loading, error } = useMenu();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-lg text-gray-600">
        Cargando menú...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-base">
        Error al cargar el menú: {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5 font-sans">
      <h1 className="text-4xl font-bold text-center text-red-500">Menú</h1>

      {categories.map((category) => (
        <div key={category.name} className="mb-10">
          <h2 className="text-blue-700 border-b-2 border-blue-700 pb-2.5 mb-5 text-3xl">
            {category.name}
          </h2>

          <div className="grid gap-5">
            {category.items
              .filter(item => item.available) // Solo mostrar items disponibles
              .map((item) => (
              <div
                key={item.id}
className="flex items-start p-4 border border-gray-300 rounded-xl bg-white shadow-md gap-4"
              >
                {/* Image */}
                {item.imageUrl && item.imageUrl.trim() !== '' && (
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
className="w-full h-full object-cover"
                      onError={(e) => {
                        // Hide the entire image container if it fails to load
                        const container = (e.target as HTMLImageElement).parentElement;
                        if (container) {
                          container.classList.add('hidden');
                        }
                      }}
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="m-0 mb-2 text-gray-800 text-xl font-semibold">
                    {item.name}
                  </h3>
                  {item.description && item.description !== 'Sin descripción disponible' && (
                    <p className="m-0 mb-3 text-gray-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-2xl text-blue-700">
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
        <p className="text-center text-gray-600 text-lg mt-12">
          No hay elementos en el menú disponibles en este momento.
        </p>
      )}
    </div>
  );
};

export default MenuDisplay;
