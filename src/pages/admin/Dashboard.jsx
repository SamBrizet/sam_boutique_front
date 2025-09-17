import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../constantes/constantes';
import { getCategories } from '../../api/category';

const DashboardPage = () => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState([]); // Cambiado a array
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setImages(fileArray);
            setPreviews(fileArray.map(file => URL.createObjectURL(file)));
        }
        // Limpiar el valor del input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeImage = (index) => {
        const newImages = [...images];
        const newPreviews = [...previews];
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        setImages(newImages);
        setPreviews(newPreviews);
    };

    const handleUpload = async () => {
        if (!title.trim() || !description.trim() || !price.trim() || !stock.trim() || category.length === 0) {
            alert('Por favor completa todos los campos: título, descripción, precio, stock y categoría.');
            return;
        }
        if (images.length === 0) {
            alert('Debes seleccionar al menos una imagen.');
            return;
        }

        setLoading(true);

        try {
            // 1. Subir imágenes al backend
            const uploadedUrls = [];
            for (const img of images) {
                const formData = new FormData();
                formData.append('file', img);

                const res = await fetch(`${API_URL}/upload-image`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(`Error ${res.status}: ${errorData.message || 'Error al subir imagen'}`);
                }

                const data = await res.json();
                console.log('Imagen subida:', data);
                uploadedUrls.push({ url: data.url });
            }

            // 2. Enviar el producto con las URLs de las imágenes
            const productRes = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    price: parseFloat(price), // Convert price to number
                    stock: parseInt(stock, 10), // Convert stock to number
                    category, // Enviar la categoría seleccionada
                    images: uploadedUrls,
                }),
            });
            console.log('Producto guardado:', productRes);

            if (!productRes.ok) throw new Error('Error al guardar el producto');

            alert('Producto subido correctamente');
            setTitle('');
            setDescription('');
            setPrice('');
            setStock('');
            setCategory([]); // Reiniciar a array vacío
            setImages([]);
            setPreviews([]);
        } catch (err) {
            alert('Error al subir: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 space-y-6">
            <h2 className="text-2xl font-semibold">Subir nuevo producto</h2>



            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <textarea
                placeholder="Descripción"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={e => setStock(e.target.value)}
                className="w-full border p-2 rounded"
            />

            {/* Multiselect para categorías */}
            <select
                multiple
                value={category}
                onChange={e => setCategory(Array.from(e.target.selectedOptions, option => option.value))}
                className="w-full border p-2 rounded"
                required
            >
                {categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>

            <div className="relative">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    name="file"
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="block w-full text-center text-white bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-2 rounded-lg cursor-pointer hover:from-pink-600 hover:to-orange-500 transition-all duration-300"
                >
                    Seleccionar Imágenes
                </label>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {previews.map((src, index) => (
                        <div key={index} className="relative">
                            <img src={src} alt={`Preview ${index}`} className="rounded shadow w-full h-32 object-cover" />
                            <button
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-white text-red-500 rounded-full px-2 py-1 text-sm shadow"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={handleUpload}
                className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition"
                disabled={loading}
            >
                {loading ? 'Subiendo...' : 'Upload'}
            </button>
        </div>
    );
};

export default DashboardPage;