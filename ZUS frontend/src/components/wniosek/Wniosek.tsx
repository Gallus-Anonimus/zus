import {Addres} from "./Addres/Addres.tsx";
import {useState} from "react";
import type {FormData} from "../../types/formData.ts";

const Wniosek = () => {
    const [formData, setFormData] = useState<FormData>({
        pesel: "",
        data: "",
        name: "",
        surname: "",
        phoneNumber: "",
        address: {
            street: "",
            country: "",
            city: "",
            postalCode: "",
            buildingNumber: "",
        },
    });

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
            const response = await fetch("http://localhost:3000/wniosek", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setFormData({
                    pesel: "",
                    data: "",
                    name: "",
                    surname: "",
                    phoneNumber: "",
                    address: {
                        street: "",
                        country: "",
                        city: "",
                        postalCode: "",
                        buildingNumber: "",
                    },
                });
            }
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddressChange = (address: FormData["address"]) => {
        setFormData((prev) => ({
            ...prev,
            address,
        }));
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-md-10">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title mb-0">Wniosek</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="pesel" className="form-label fw-semibold">PESEL</label>
                                    <input 
                                        type="text" 
                                        name="pesel" 
                                        id="pesel"
                                        className="form-control" 
                                        placeholder="Wprowadź PESEL"
                                        value={formData.pesel}
                                        onChange={(e) => handleInputChange("pesel", e.target.value)}
                                    />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="data" className="form-label fw-semibold">Data</label>
                                    <input 
                                        type="date" 
                                        name="data" 
                                        id="data"
                                        className="form-control"
                                        value={formData.data}
                                        onChange={(e) => handleInputChange("data", e.target.value)}
                                    />
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label fw-semibold">Imię</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            id="name"
                                            className="form-control" 
                                            placeholder="Wprowadź imię"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="surname" className="form-label fw-semibold">Nazwisko</label>
                                        <input 
                                            type="text" 
                                            name="surname" 
                                            id="surname"
                                            className="form-control" 
                                            placeholder="Wprowadź nazwisko"
                                            value={formData.surname}
                                            onChange={(e) => handleInputChange("surname", e.target.value)}
                                        />
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <Addres address={formData.address} onHook={handleAddressChange} />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label fw-semibold">Numer telefonu</label>
                                    <input 
                                        type="text" 
                                        name="phoneNumber" 
                                        id="phoneNumber"
                                        className="form-control" 
                                        placeholder="Wprowadź numer telefonu"
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                    />
                                </div>

                                <div className="d-grid gap-2 mt-4">
                                    <button className="btn btn-primary btn-lg" type="submit">
                                        Wyślij wniosek
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wniosek;