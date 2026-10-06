import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IoChevronBack,
    IoHome,
    IoBusiness,
    IoLocation,
    IoCheckmark,
    IoAdd,
} from "react-icons/io5";

import {
    getAddresses,
    addAddress,
    deleteAddress,
} from "../../api/addressApi";

const emptyAddressForm = {
    type: "Home",
    name: "",
    mobile: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
};

const Address = () => {
    const navigate = useNavigate();

    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressForm, setAddressForm] = useState(emptyAddressForm);
    const [savingAddress, setSavingAddress] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getAddresses();

                const addresses = response.data;

                setAddress(addresses);

                const defaultAddress = addresses.find(
                    (item) => item.isDefault
                );

                setSelectedAddress(
                    defaultAddress?._id ||
                    addresses[0]?._id ||
                    null
                );
            } catch (error) {
                console.error("Failed to fetch addresses:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load addresses"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    const getIcon = (type) => {
        if (type?.toLowerCase() === "home") {
            return <IoHome size={34} />;
        }

        if (type?.toLowerCase() === "office") {
            return <IoBusiness size={34} />;
        }

        return <IoLocation size={34} />;
    };

    const handleDelete = async (id) => {
        try {
            await deleteAddress(id);

            setAddress((current) =>
                current.filter((item) => item._id !== id)
            );

            if (selectedAddress === id) {
                setSelectedAddress(null);
            }
        } catch (error) {
            console.error("Failed to delete address:", error);

            setError(
                error.response?.data?.message ||
                "Failed to delete address"
            );
        }
    };

    const handleEdit = (id) => {
        console.log("Edit address:", id);
    };

    const handleAddAddress = () => {
        setError("");
        setAddressForm(emptyAddressForm);
        setShowAddressForm(true);
    };

    const handleAddressSubmit = async (event) => {
        event.preventDefault();

        try {
            setSavingAddress(true);
            setError("");

            const response = await addAddress(addressForm);
            const savedAddress = response.data.address;

            setAddress((current) => [savedAddress, ...current]);
            setSelectedAddress(savedAddress._id);
            setShowAddressForm(false);
            setAddressForm(emptyAddressForm);
        } catch (error) {
            console.error("Failed to add address:", error);
            setError(
                error.response?.data?.message ||
                "Failed to add address. Please try again."
            );
        } finally {
            setSavingAddress(false);
        }
    };

    return (
        <main className="min-h-screen">
            <div className="mx-auto min-h-screen w-full max-w-[480px] px-5">

                {/* Header */}
                <header className="relative flex h-[78px] items-center justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 flex h-10 w-10 items-center justify-start"
                    >
                        <IoChevronBack size={30} />
                    </button>

                    <h1 className="text-[23px] font-bold">
                        Select Delivery Address
                    </h1>
                </header>

                {/* Loading */}
                {loading && (
                    <div className="py-10 text-center text-gray-500">
                        Loading addresses...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="py-5 text-center text-red-500" role="alert">
                        {error}
                    </div>
                )}

                {/* Address list */}
                {!loading && (
                    <section className="space-y-4">
                        {address.length === 0 ? (
                            <div className="py-10 text-center text-gray-500">
                                No addresses found.
                            </div>
                        ) : (
                            address.map((item) => {
                                const isSelected =
                                    selectedAddress === item._id;

                                return (
                                    <article
                                        key={item._id}
                                        onClick={() =>
                                            setSelectedAddress(item._id)
                                        }
                                        className="relative cursor-pointer rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                                    >
                                        <div className="flex gap-4">

                                            {/* Icon */}
                                            <div
                                                className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl ${
                                                    isSelected
                                                        ? "bg-[#EAF8F0] text-[#07883F]"
                                                        : "bg-gray-50 text-[#16394B]"
                                                }`}
                                            >
                                                {getIcon(item.type)}
                                            </div>

                                            {/* Address information */}
                                            <div className="min-w-0 flex-1 pr-8">
                                                <h2 className="text-[21px] font-bold">
                                                    {item.type}
                                                </h2>

                                                <p className="mt-1 text-[16px] leading-6 text-gray-500">
                                                    {item.addressLine},{" "}
                                                    {item.city},{" "}
                                                    {item.state} -{" "}
                                                    {item.pincode}
                                                </p>

                                                <div className="mt-4 flex items-center gap-4">
                                                    <button
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleEdit(
                                                                item._id
                                                            );
                                                        }}
                                                        className="font-semibold text-[#07883F]"
                                                    >
                                                        Edit
                                                    </button>

                                                    <span className="text-gray-400">
                                                        |
                                                    </span>

                                                    <button
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleDelete(
                                                                item._id
                                                            );
                                                        }}
                                                        className="font-semibold text-gray-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Selection */}
                                            <div
                                                className={`absolute right-5 top-8 flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                                                    isSelected
                                                        ? "border-[#07883F] bg-[#07883F]"
                                                        : "border-gray-400"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <IoCheckmark
                                                        size={22}
                                                        className="text-white"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })
                        )}
                    </section>
                )}

                {/* Add new address */}
                <button
                    onClick={handleAddAddress}
                    type="button"
                    className="mt-6 flex h-[62px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#07883F] text-[18px] font-semibold text-[#07883F]"
                >
                    <IoAdd size={25} />
                    Add New Address
                </button>

                {showAddressForm && (
                    <form
                        onSubmit={handleAddressSubmit}
                        className="mt-5 space-y-4 rounded-2xl border border-gray-100 p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)]"
                    >
                        <h2 className="text-lg font-bold">New delivery address</h2>

                        <label className="block text-sm font-medium text-gray-700">
                            Address type
                            <select
                                value={addressForm.type}
                                onChange={(event) =>
                                    setAddressForm((current) => ({
                                        ...current,
                                        type: event.target.value,
                                    }))
                                }
                                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                            >
                                <option>Home</option>
                                <option>Office</option>
                                <option>Other</option>
                            </select>
                        </label>

                        {[
                            ["name", "Full name", "text"],
                            ["mobile", "Mobile number", "tel"],
                            ["addressLine", "House / street address", "text"],
                            ["city", "City", "text"],
                            ["state", "State", "text"],
                            ["pincode", "PIN code", "text"],
                        ].map(([field, label, type]) => (
                            <label key={field} className="block text-sm font-medium text-gray-700">
                                {label}
                                <input
                                    required
                                    type={type}
                                    value={addressForm[field]}
                                    onChange={(event) =>
                                        setAddressForm((current) => ({
                                            ...current,
                                            [field]: event.target.value,
                                        }))
                                    }
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3"
                                />
                            </label>
                        ))}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAddressForm(false)}
                                disabled={savingAddress}
                                className="h-12 flex-1 rounded-xl border border-gray-300 font-semibold text-gray-700 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={savingAddress}
                                className="h-12 flex-1 rounded-xl bg-[#07883F] font-semibold text-white disabled:opacity-50"
                            >
                                {savingAddress ? "Saving..." : "Save address"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default Address;