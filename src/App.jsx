import { useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const [dataForm, setDataForm] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData("");
        setError("");
        if (!dataForm.trim()) {
            setError("Please enter a URL.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `https://${
                    import.meta.env.VITE_BACKEND_BASE_URL
                }/create-shortlink`,
                { url: dataForm, withCredentials: true }
            );
            if (response.data) {
                setData(response.data.data);
            }
        } catch (err) {
            const errorMessage =
                err.response.data.message || "Internal Server Error";
            setError(errorMessage);
            setData("");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[url('/background.svg')] bg-no-repeat bg-center bg-cover w-full min-h-svh flex flex-col font-Silkscreen px-4 lg:px-0">
            <div className="flex flex-col items-center justify-end gap-8 h-[450px]">
                <h1 className="text-4xl text-white text-center font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    CREATE YOUR SHORT LINK
                </h1>
                <form
                    className="w-full flex flex-col justify-center items-center gap-3"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <input
                        type="text"
                        name="url"
                        value={dataForm}
                        onChange={(e) => setDataForm(e.target.value)}
                        className="bg-white outline-0 px-2 py-4 w-full max-w-[850px] shadow-[_-4px_0_0_0_black,_4px_0_0_0_black,_0_-4px_0_0_black,_0_4px_0_0_black] rounded"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="bg-[#5145c4] hover:bg-[#393088] text-white border-t border-l border-r-4 border-b-4 border-black w-32 lg:w-52 h-14 cursor-pointer transition-colors duration-200 text-sm sm:text-base"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
            <div className="flex justify-center w-full pt-4 flex-1">
                {loading && <Loading />}

                {!loading && error && (
                    <div className="text-red-700 px-4 py-3 rounded-lg max-w-2xl text-center">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {!loading && data && (
                    <div className="p-4 text-center max-w-2xl">
                        <a
                            href={data}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 h-fit font-semibold lg:text-lg break-all hover:underline"
                        >
                            {data}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
