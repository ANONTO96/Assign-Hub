const faqs = [
  {
    question: 'What is AssignHub used for?',
    answer: 'AssignHub helps manage tasks, track progress, and improve team collaboration efficiently.',
  },
  {
    question: 'Is AssignHub free to use?',
    answer: 'Yes! We offer a free plan with essential features to get you started.',
  },
  {
    question: 'Can I collaborate with my team on AssignHub?',
    answer: 'Absolutely! AssignHub is designed for seamless team collaboration and productivity.',
  },
];

const FAQ = () => {
  return (
    <div className="py-12 bg-[var(--background)] transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center mb-8 text-[var(--text-primary)]">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto px-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow rounded-lg mb-5 shadow-lg border border-[var(--border-color)] bg-[var(--card-bg)] transition-colors duration-300"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium text-[var(--text-primary)]">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-[var(--text-secondary)]">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
