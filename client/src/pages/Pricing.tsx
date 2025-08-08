import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check,
  Crown,
  Rocket,
  Building2,
  Mail,
  Star,
  Zap,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';
import toast from 'react-hot-toast';

import DashboardLayout from '../components/DashboardLayout';
import { useAuthStore } from '../stores/authStore';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { user } = useAuthStore();

  const handleUpgrade = (planName: string) => {
    toast.success(`Redirecting to ${planName} plan upgrade...`);
    // Here you would integrate with a payment provider like Stripe
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for small teams',
      icon: <Rocket className="w-8 h-8 text-white" />,
      color: 'from-aurora-blue to-aurora-green',
      price: {
        monthly: 30,
        yearly: 300
      },
      features: [
        'Up to 5 team members',
        '10 projects',
        'Basic analytics',
        'Email support',
        '1GB storage'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For growing businesses',
      icon: <Crown className="w-8 h-8 text-white" />,
      color: 'from-aurora-green to-aurora-purple',
      price: {
        monthly: 50,
        yearly: 500
      },
      features: [
        'Up to 25 team members',
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        '10GB storage',
        'AI-powered insights',
        'Custom workflows'
      ],
      buttonText: 'Start Pro Trial',
      popular: true
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'For large organizations',
      icon: <Star className="w-8 h-8 text-white" />,
      color: 'from-aurora-purple to-aurora-pink',
      price: {
        monthly: 100,
        yearly: 1000
      },
      features: [
        'Up to 100 team members',
        'Unlimited everything',
        'Real-time analytics',
        '24/7 phone support',
        '100GB storage',
        'Advanced AI features',
        'API access',
        'Custom integrations'
      ],
      buttonText: 'Choose Advanced',
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For enterprise solutions',
      icon: <Building2 className="w-8 h-8 text-white" />,
      color: 'from-aurora-yellow to-aurora-orange',
      price: {
        monthly: 'Custom',
        yearly: 'Custom'
      },
      features: [
        'Unlimited team members',
        'White-label solution',
        'Custom analytics',
        'Dedicated support team',
        'Unlimited storage',
        'On-premise deployment',
        'Custom development',
        'SLA guarantee'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const currentPlan = 'basic'; // This would come from user data

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock the full potential of your team with the perfect plan for your needs
          </p>
        </motion.div>

        {/* Current Plan Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Current Plan</h3>
              <p className="text-gray-400">You are currently on the <span className="text-aurora-green capitalize">{currentPlan}</span> plan</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">$30</div>
                <div className="text-sm text-gray-400">per month</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-aurora-blue to-aurora-green rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="glass rounded-xl p-1 flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-aurora-green text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-aurora-green text-black font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-aurora-pink text-white text-xs px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className={`glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 relative ${
                plan.popular 
                  ? 'border-2 border-aurora-green' 
                  : currentPlan === plan.id
                  ? 'border-2 border-aurora-blue'
                  : 'border border-glass-secondary'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-aurora-green to-aurora-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {currentPlan === plan.id && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-aurora-blue to-aurora-purple text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Current Plan
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  {typeof plan.price[billingCycle] === 'number' ? (
                    <>
                      <span className="text-3xl font-bold gradient-text">
                        ${plan.price[billingCycle]}
                      </span>
                      <span className="text-gray-400 ml-2">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold gradient-text">
                      {plan.price[billingCycle]}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-aurora-green mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.id === 'enterprise') {
                    window.open('mailto:support@revolution.com', '_blank');
                  } else if (currentPlan === plan.id) {
                    toast.info('You are already on this plan');
                  } else {
                    handleUpgrade(plan.name);
                  }
                }}
                disabled={currentPlan === plan.id && plan.id !== 'enterprise'}
                className={`w-full py-3 px-4 rounded-xl transition-colors text-sm font-medium ${
                  currentPlan === plan.id && plan.id !== 'enterprise'
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : plan.popular
                    ? 'neo-button bg-aurora-green text-black hover:bg-aurora-blue'
                    : plan.id === 'enterprise'
                    ? 'glass hover:bg-glass-accent text-white flex items-center justify-center gap-2'
                    : 'glass hover:bg-glass-accent text-white'
                }`}
              >
                {plan.id === 'enterprise' ? (
                  <>
                    <Mail className="w-4 h-4" />
                    {plan.buttonText}
                  </>
                ) : currentPlan === plan.id ? (
                  'Current Plan'
                ) : (
                  plan.buttonText
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Why Choose Revolution?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Lightning Fast</h4>
              <p className="text-gray-400">Experience unparalleled speed with our optimized platform</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-aurora-purple to-aurora-pink rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Team Collaboration</h4>
              <p className="text-gray-400">Seamless collaboration tools that bring teams together</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-aurora-yellow to-aurora-green rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Analytics & Insights</h4>
              <p className="text-gray-400">Advanced analytics to track and improve your productivity</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Can I change my plan anytime?</h4>
              <p className="text-gray-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Do you offer a free trial?</h4>
              <p className="text-gray-400">All plans come with a 14-day free trial. No credit card required to get started.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Pricing;