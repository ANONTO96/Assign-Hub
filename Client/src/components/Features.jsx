const features = [
  {
    title: 'Task Management',
    description: 'Organize your tasks efficiently and never miss a deadline again.',
    icon: '📋',
  },
  {
    title: 'Team Collaboration',
    description: 'Work together seamlessly with your team in real-time.',
    icon: '🤝',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor task progress and stay on top of your goals.',
    icon: '📊',
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-[var(--background)] transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-8 text-[var(--text-primary)]">
        Why Choose AssignHub?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-[var(--card-bg)] rounded-lg shadow-lg border border-[var(--border-color)] text-center hover:shadow-lg transition-colors duration-300"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-semibold mb-2 text-[var(--text-primary)]">
              {feature.title}
            </h3>
            <p className="text-[var(--text-secondary)]">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
