export default function FeatureCards() {
  const features = [
    {
      icon: '🔍',
      title: 'Comprehensive Database',
      description: 'Search millions of phone numbers from our extensive database'
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Get phone number information in seconds'
    },
    {
      icon: '🔒',
      title: 'Privacy Protected',
      description: 'Your searches are private and secure'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Search from any device, anywhere'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose PhoneLookup Pro?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}