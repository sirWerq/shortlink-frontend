export default function Loading() {
    return (
        <div className="flex flex-col items-center gap-4 pt-2">
            <div
                className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-red-700 border-t-transparent"
                role="status"
                aria-label="loading"
            ></div>
        </div>
    );
}
