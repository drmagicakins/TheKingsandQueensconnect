export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-bold text-white text-center">
        {title}
      </h1>
      <p className="text-sm text-gray-300 text-center mt-2">
        {subtitle}
      </p>

      <div className="mt-6">{children}</div>
    </div>
  );
}
