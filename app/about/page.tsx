import { Heart, Target, Users, Award, TrendingUp, Shield } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Heart size={40} />,
      title: 'Preserve Traditional Commerce',
      description: 'We believe in protecting the heritage of Kirana shops while embracing modern technology.',
      color: 'heritage-red'
    },
    {
      icon: <Users size={40} />,
      title: 'Empower Elderly Entrepreneurs',
      description: 'Technology should work for everyone, regardless of age or technical experience.',
      color: 'tech-blue'
    },
    {
      icon: <Target size={40} />,
      title: 'Community-First Approach',
      description: 'Local shops are the heart of communities. Their success is our mission.',
      color: 'heritage-gold'
    },
    {
      icon: <Shield size={40} />,
      title: 'Continuous Support',
      description: 'We don\'t just install and leave. We\'re partners in your long-term success.',
      color: 'success'
    }
  ];

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'Founder & CEO',
      nepali: 'राजेश शर्मा',
      bio: 'Former software engineer who witnessed his grandfather struggle with modern competition. Founded Kirana Digital to bridge tradition and technology.',
      experience: '15 years in tech'
    },
    {
      name: 'Anjali Thapa',
      role: 'Head of Product',
      nepali: 'अन्जली थापा',
      bio: 'UX designer specializing in accessibility. Passionate about creating technology that works for elderly users.',
      experience: '10 years in UX design'
    },
    {
      name: 'Krishna Poudel',
      role: 'Customer Success Lead',
      nepali: 'कृष्ण पौडेल',
      bio: 'Former shop owner turned advocate. Understands firsthand the challenges and opportunities of digital transformation.',
      experience: '20 years in retail'
    },
    {
      name: 'Suman Adhikari',
      role: 'Technical Director',
      nepali: 'सुमन अधिकारी',
      bio: 'AI and machine learning expert. Builds intelligent systems that predict and adapt to business needs.',
      experience: '12 years in AI/ML'
    }
  ];

  const milestones = [
    { year: '2023', event: 'Company Founded', description: 'Started with a vision to digitize Nepal\'s Kirana shops' },
    { year: '2023', event: 'First 10 Shops', description: 'Successfully transformed our first 10 shops in Kathmandu' },
    { year: '2024', event: 'AI Integration', description: 'Launched AI-powered inventory forecasting' },
    { year: '2024', event: '50+ Shops', description: 'Reached 50 transformed shops across Kathmandu Valley' },
    { year: '2025', event: 'ISO Certification', description: 'Achieved ISO 27001 security certification' },
    { year: '2025', event: 'National Expansion', description: 'Expanding services to major cities across Nepal' }
  ];

  const impact = [
    { metric: '50+', label: 'Shops Transformed' },
    { metric: '150+', label: 'Jobs Preserved' },
    { metric: '₹2.5Cr+', label: 'Revenue Generated' },
    { metric: '10,000kg', label: 'Waste Reduced' },
    { metric: '95%', label: 'Customer Satisfaction' },
    { metric: '18%', label: 'Avg Revenue Increase' }
  ];

  return (
    <main>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            On a Mission to Preserve Nepal's<br />
            <span className="text-heritage-gold">किराना Heritage</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We're not just building software. We're protecting a way of life that has served communities for generations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Kirana Digital was born from a simple observation: Nepal's traditional shops are struggling not because they lack value, but because they lack tools designed for them.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our founder, Rajesh Sharma, watched his 65-year-old grandfather struggle to compete with modern supermarkets. The shop that had served the community for 40 years was losing customers—not because of poor service, but because it couldn't offer digital payments, maintain accurate inventory, or compete with modern retail experiences.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Most "solutions" on the market were built for young, tech-savvy users. They had complex interfaces, required extensive training, and assumed users were comfortable with technology. They ignored the reality: most Kirana shop owners are elderly, prefer Nepali language, and have limited technical experience.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              So we built something different. Technology that respects age, language, and tradition. Systems designed from the ground up for elderly Nepali shop owners. Solutions that are powerful enough to compete with modern retail, yet simple enough for anyone to use.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-semibold">
              Today, 50+ shops have been transformed. Hundreds of jobs preserved. Millions in revenue generated. But most importantly, traditional commerce continues to thrive in Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className={`text-${value.color} mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                {/* Avatar Placeholder */}
                <div className="bg-gradient-to-br from-heritage-red to-heritage-gold h-48 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-heritage-red font-semibold mb-1 text-sm">{member.nepali}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm mb-3">{member.bio}</p>
                  <div className="pt-3 border-t text-xs text-gray-500">
                    {member.experience}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-heritage-red to-heritage-gold rounded-full flex items-center justify-center font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow pb-8 border-b border-white/20">
                    <h3 className="text-2xl font-bold mb-2">{milestone.event}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <TrendingUp size={48} className="mx-auto text-heritage-red mb-4" />
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Measurable results that matter</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impact.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg text-center border-t-4 border-heritage-red">
                <div className="text-5xl font-bold text-heritage-red mb-2">{item.metric}</div>
                <div className="text-gray-700 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl font-bold mb-12 text-center">Partners & Recognition</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <Award size={48} className="mx-auto text-heritage-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">ISO 27001 Certified</h3>
              <p className="text-gray-600">International security standards</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <Award size={48} className="mx-auto text-tech-blue mb-4" />
              <h3 className="text-xl font-bold mb-2">Nepal IT Association</h3>
              <p className="text-gray-600">Member in good standing</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <Award size={48} className="mx-auto text-success mb-4" />
              <h3 className="text-xl font-bold mb-2">Best Innovation 2024</h3>
              <p className="text-gray-600">Nepal Startup Awards</p>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">Technology Partners</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['eSewa', 'Khalti', 'ConnectIPS', 'IME Pay', 'AWS', 'Google Cloud'].map((partner, index) => (
                <div key={index} className="text-xl font-bold text-gray-400 px-6 py-3 border border-gray-200 rounded-lg">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-heritage-red to-heritage-gold text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a shop owner, investor, or someone who believes in preserving traditional commerce, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary bg-white text-heritage-red hover:bg-gray-100 inline-flex items-center justify-center">
              Get in Touch
            </a>
            <a href="/careers" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white/10 inline-flex items-center justify-center">
              Join Our Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
