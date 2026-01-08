export default function Hero() {
  return (
    <section className="py-20 bg-white border-b">
      <div className="max-w-4xl px-4 mx-auto text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          A place to ask questions and share knowledge
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          Learn from real experiences, deep insights, and thoughtful answers
          from Kings and Queens around the world.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 font-semibold text-white bg-red-600 rounded-md"
          >
            Join Now
          </a>

          <a
            href="/login"
            className="px-6 py-3 font-semibold border border-gray-300 rounded-md"
          >
            Sign In
          </a>
        </div>
      </div>
    </section>
  );
}
