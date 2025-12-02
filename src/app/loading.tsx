export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#E0F7F5] border-t-[#2A8080] rounded-full animate-spin"></div>
        <p className="text-[#2A8080] font-semibold animate-pulse">Carregando...</p>
      </div>
    </div>
  );
}