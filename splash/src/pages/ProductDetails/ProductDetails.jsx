import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    IoChevronBack,
    IoHeart,
    IoHeartOutline,
    IoShareSocialOutline,
    IoLeafOutline,
    IoWaterOutline,
} from "react-icons/io5";

import { getProductsById } from "../../api/productApi";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [liked, setLiked] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getProductsById(productId);

                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const handleShare = async () => {
        if (!product) return;

        const shareData = {
            title: product.name,
            text: `Check out ${product.name}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled sharing
            }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Cart API integration will be done in the Cart step.
        console.log(
            "Added to cart:",
            product.name,
            "Quantity:",
            quantity
        );
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-600">
                        Loading product...
                    </p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-xl font-semibold">
                        {error || "Product not found"}
                    </h1>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-4 rounded-xl bg-[#07883F] px-5 py-3 text-white"
                    >
                        Go Back
                    </button>
                </div>
            </main>
        );
    }

    const originalPrice = product.originalPrice || product.price;

    const discount =
        originalPrice > product.price
            ? Math.round(
                ((originalPrice - product.price) / originalPrice) * 100
            )
            : 0;

    return (
        <main className="min-h-screen">
            <div className="mx-auto min-h-screen w-full max-w-[480px]">

                {/* Product image */}
                <section className="relative h-[460px] overflow-hidden bg-[#f7f9f7]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(to bottom, black 68%, transparent 100%)",
                            maskImage:
                                "linear-gradient(to bottom, black 68%, transparent 100%)",
                        }}
                    />

                    {/* Top actions */}
                    <div className="absolute left-5 right-5 top-6 z-10 flex items-center justify-between">

                        {/* Back */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm"
                        >
                            <IoChevronBack size={24} />
                        </button>

                        {/* Wishlist + Share */}
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    setLiked((current) => !current)
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm"
                            >
                                {liked ? (
                                    <IoHeart
                                        size={24}
                                        className="text-red-500"
                                    />
                                ) : (
                                    <IoHeartOutline
                                        size={24}
                                        className="text-gray-700"
                                    />
                                )}
                            </button>

                            <button
                                onClick={handleShare}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm"
                            >
                                <IoShareSocialOutline size={24} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Product Info */}
                <section className="px-5 pb-28 pt-6">
                    <h1 className="text-[25px] font-bold leading-tight text-shadow-sm">
                        {product.name}
                    </h1>

                    <p className="mt-2 text-[19px] text-gray-500">
                        {product.unit}
                    </p>

                    <div className="mt-5 flex items-center gap-4 text-shadow-sm">
                        <span className="text-[30px] font-bold">
                            ₹{product.price}
                        </span>

                        {discount > 0 && (
                            <>
                                <span className="text-[20px] text-gray-400 line-through">
                                    ₹{originalPrice}
                                </span>

                                <span className="rounded-xl bg-[#07883F] px-4 py-2 text-sm font-semibold text-white shadow-lg">
                                    {discount}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-xl text-yellow-500">
                            ⭐
                        </span>

                        <span className="text-[17px] font-semibold">
                            {product.rating || "4.8"}
                        </span>

                        <span className="text-[17px] text-gray-500">
                            ({product.reviewCount || "0"})
                        </span>
                    </div>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-3 border-y border-gray-100 text-center shadow-[0_5px_10px_0_rgba(10,100,0,0.100)]">
                        <div className="flex flex-col items-center border-r border-gray-100 text-center">
                            <IoLeafOutline
                                size={30}
                                className="text-[#07883F]"
                            />

                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                100%
                                <br />
                                Natural
                            </p>
                        </div>

                        <div className="flex flex-col items-center border-r border-gray-100 text-center">
                            <IoLeafOutline
                                size={30}
                                className="text-[#07883F]"
                            />

                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                Farm
                                <br />
                                Fresh
                            </p>
                        </div>

                        <div className="flex flex-col items-center border-r border-gray-100 text-center">
                            <IoWaterOutline
                                size={30}
                                className="text-[#07883F]"
                            />

                            <p className="mt-2 text-sm font-semibold text-gray-700">
                                No Added
                                <br />
                                Preservation
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mt-7">
                        <h2 className="text-[22px] font-bold">
                            Product Description
                        </h2>

                        <p className="mt-4 text-[17px] leading-7 text-gray-500">
                            {product.description ||
                                "Fresh and nutritious product sourced directly from trusted local farms."}
                        </p>
                    </div>
                </section>

                {/* Bottom Cart */}
                <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto flex max-w-[480px] gap-4 border-t border-gray-100 bg-white px-5 py-4">

                    {/* Quantity */}
                    <div className="flex h-[58px] shrink-0 items-center overflow-hidden rounded-2xl border border-gray-200">
                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            aria-label="Decrease quantity"
                            className="flex h-full w-12 items-center justify-center text-2xl font-medium text-[#07883F]"
                        >
                            -
                        </button>

                        <span className="flex w-10 justify-center text-xl font-semibold">
                            {quantity}
                        </span>

                        <button
                            type="button"
                            onClick={increaseQuantity}
                            aria-label="Increase quantity"
                            className="flex h-full w-12 items-center justify-center text-2xl font-medium text-[#07883F]"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="h-[58px] flex-1 rounded-2xl bg-[#07883F] text-[18px] font-semibold text-white"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;