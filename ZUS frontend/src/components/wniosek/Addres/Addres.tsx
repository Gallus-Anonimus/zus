import type {AddresType} from "../../../types/formData.ts";

interface Props {
    address: AddresType;
    onHook: (addr: AddresType) => void;
}

export const Addres = ({address, onHook}: Props) => {
    const updateAddress = (field: keyof AddresType, value: string) => {
        onHook({
            ...address,
            [field]: value,
        });
    };

    return (
        <div className="border rounded p-3 bg-light">
            <h5 className="form-label fw-semibold mb-3">Adres</h5>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="street" className="form-label fw-semibold">Ulica</label>
                    <input
                        id="street"
                        name="street"
                        type="text"
                        className="form-control"
                        placeholder="Wprowadź ulicę"
                        value={address?.street || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateAddress("street", e.target.value);
                        }}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="country" className="form-label fw-semibold">Kraj</label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        className="form-control"
                        placeholder="Wprowadź kraj"
                        value={address?.country || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateAddress("country", e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <label htmlFor="city" className="form-label fw-semibold">Miasto</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        className="form-control"
                        placeholder="Wprowadź miasto"
                        value={address?.city || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateAddress("city", e.target.value);
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="postalCode" className="form-label fw-semibold">Kod pocztowy</label>
                    <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        className="form-control"
                        placeholder="XX-XXX"
                        value={address?.postalCode || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateAddress("postalCode", e.target.value);
                        }}
                    />
                </div>
                <div className="col-md-4">
                    <label htmlFor="buildingNumber" className="form-label fw-semibold">Numer budynku</label>
                    <input
                        id="buildingNumber"
                        name="buildingNumber"
                        type="text"
                        className="form-control"
                        placeholder="Nr"
                        value={address?.buildingNumber || ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateAddress("buildingNumber", e.target.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};