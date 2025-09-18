import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCategories } from '../../api/category';
import { updateProduct } from '../../api/product';
import { API_URL } from '../../constantes/constantes';

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]); // Default main image
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleDeleteImage = (image) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
      setProduct({
        ...product,
        images: product.images.filter((img) => img !== image),
      });
    }
  };

  const handleSetMainImage = (image) => {
    setMainImage(image);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        title: product.title || '',
        description: product.description || '',
        price: parseFloat(product.price) || 0, // Asegurar que sea un número
        category: product.category || [], // Asegurar que sea un array de strings
        stock: parseInt(product.stock, 10) || 0, // Asegurar que sea un número entero
        images: product.images.map((image) => ({ url: image })), // Transformar a array de objetos con clave `url`
      };

      const response = await updateProduct(id, updatedProduct);


      /* RESPONSE:
      {
    "_id": "68acb915d94b3b89b6c1e842",
    "title": "dasxxxxf",
    "description": "dsadsx",
    "price": 12,
    "stock": 2,
    "category": [
        "68abcefcfaa1e242c87b5c10",
        "68abd290faa1e242c87b5c26"
    ],
    "images": [
        "https://storage.googleapis.com/matrimonioxd/PRODUCTS/3e0e1369-e888-4af9-8dfd-22976dca2342_WhatsApp%20Image%202025-08-25%20at%2012.53.21%20AM.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sam-boutique%40hale-skill-452420-j6.iam.gserviceaccount.com%2F20250825%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250825T192713Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=45057160f411c474ab1c766b18e82c7d44f49f7519a599f1d81626c5a90cfdd5762de2472e067a96bbc1cb8c2c7ffbcd7e1537804b437963bc833b5842bbcf37920769650ed3f4b798e2f1b5bbf82feb4726234a58d18a91e3b0262d63841634927d76ad36ecd3b85e4b5931603b12bca69111fede5bc76e44a8bf33c8d78df97980c755c4b29b2c7cfd3f5b1d85d983c5eac99ad81468e375278952f14a13a1ab923bf99d928f9a3abc40eda27b79e84c2280bff3b1c4384e3a7c4450172b24db96f09031bec3f1621b6dab2b82152ba5b35dfd9c2ddeea5943cb4351886370ed78a1873045ee4ba6df5ac388745f5ba18c2eb88302b878e9709f273a23935b",
        "https://storage.googleapis.com/matrimonioxd/PRODUCTS/c6bacb92-1b48-482c-b46e-9fbf85bd5d40_WhatsApp%20Image%202025-08-25%20at%2012.53.20%20AM%20%281%29.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sam-boutique%40hale-skill-452420-j6.iam.gserviceaccount.com%2F20250825%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250825T192714Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=8bdd4422dd286aa9c475e552e7865e75b2bf95733fbf24590845d0419df29dde72c7929e2ee4033ed5856b2fd74a0a03c8e6821a6333d32b3496a5a8d5bf490c9f6340dba5664f88ab74deb5bbe5cc71296c7819785de1af6703db429ce462ddaf5882d4a42f8df10ab5fb1f79f4caf46fc83601e8e6a6c2112e7a6f23334622c647662d761839fefb6f5854cd1a46bed7fd44db65ecb3e350ff0ad3012ca1e3bd94a593096eed4f993030f92049438abe1b618de7c9f8e2df45c192d08cb3e4a17d4892ef9b62e1ed0ad42ec90dcb1259c5a90654f6934a99079886d66eb678dff0680213da281e6e9809ff47e731c256433429ca04f40a0c0b37465a0bc5f1",
        "https://storage.googleapis.com/matrimonioxd/PRODUCTS/cc81fdcd-ef0b-4fad-bf46-9dc2c9c06b7e_WhatsApp%20Image%202025-08-25%20at%2012.53.20%20AM.jpeg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=sam-boutique%40hale-skill-452420-j6.iam.gserviceaccount.com%2F20250825%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250825T192717Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=3ef3347d6deb98193698c97a8ebfe7103c927fe47c98fb863d51557e075aa8aa21d0e45232f9e790d1ff1febd69deda1c8b351d613cdbd576c47978da7ed4b929c07346b1453d969e97ef275777955b584be101ccfc0984f754dc066b7e12465cd68d6c7c192d90f7d2cee93ee309fb71682c3e88bebb630f621b796f77850e10c23282e6b29c5056215aa882d3c2ab0a2647aa3bf57783071e97b9c34e9ba3353b2d87ab9062743d4755cf75a0e7507c505241926e051749b13c15d9d84c4b79e3f50c22ac08012e9a8509114f72ddffe4b094d84241a69b179b4130f17a5424e064ee08f6cf1b18dbcb4ccc8de0d230e5e85697d1e239bbb448c25743aface"
    ],
    "isFeatured": false,
    "createdAt": "2025-08-25T19:27:17.348Z",
    "updatedAt": "2025-08-25T19:33:38.892Z",
    "__v": 0
} */

      if (!response || response.error) {
        throw new Error(response ? response.error : 'Error actualizando el producto');
      }

      alert('Producto actualizado correctamente');
    } catch (error) {
      console.error('Error actualizando producto:', error);
      alert('Error al actualizar el producto: ' + error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
        <form className="space-y-4" onSubmit={handleUpdateProduct}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              value={product.title || ''}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              value={product.description || ''}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              value={product.price || ''}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={product.stock || ''}
              onChange={(e) => setProduct({ ...product, stock: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Categorías</label>
            <select
              multiple
              value={product.category || []}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category: Array.from(e.target.selectedOptions, (option) => option.value),
                })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Imágenes</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {product.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md shadow-md"
                  />
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => handleSetMainImage(image)}
                    className={`absolute bottom-2 right-2 px-2 py-1 rounded-md shadow-md ${
                      mainImage === image
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-300 text-black hover:bg-yellow-500 hover:text-white'
                    }`}
                  >
                    {mainImage === image ? 'Principal' : 'Seleccionar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium transform hover:scale-105"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
