import React from 'react'
import { Check } from 'lucide-react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'


const Plan = () => {
  /*
    The Plan component displays the pricing section of your app.
    Custom pricing cards showing Free and Premium plans.
  */
  
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      subtitle: 'Forever free',
      popular: false,
      features: [
        'Unlimited Title Generation',
        'Unlimited Article Generation',
        'Background Removal',
        'Object Removal',
        'Resume Review'
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-gray-800 text-white hover:bg-gray-700'
    },
    {
      name: 'Premium',
      price: '₹899',
      subtitle: 'Billed monthly',
      popular: true,
      features: [
        'Everything in Free',
        'AI Image Generation',
        'Priority Support',
        'Commercial Use License'
      ],
      buttonText: 'Upgrade to Premium',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg'
    }
  ]

  return (
    <div className='max-w-5xl mx-auto z-20 my-12 sm:my-16 px-4'>
      {/* Headline and description for the pricing section */}
      <div className='text-center mb-8 sm:mb-12'>
        <h2 className='text-slate-700 text-2xl sm:text-3xl md:text-4xl font-semibold'>Choose Your Plan</h2>
        <p className='text-gray-500 max-w-xl mx-auto mt-2 sm:mt-3 text-xs sm:text-sm md:text-base leading-relaxed px-2'>
          Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
        </p>
      </div>

      {/* Pricing cards */}
      <div className='grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto'>
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`bg-white rounded-xl overflow-hidden hover:shadow-2xl transition-all relative ${
              plan.popular 
                ? 'border-2 border-purple-500 shadow-lg scale-105' 
                : 'border border-gray-200'
            }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className='absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg'>
                POPULAR
              </div>
            )}

            {/* Header section with title and price */}
            <div className='p-4 sm:p-5 border-b border-gray-200'>
              <h3 className='text-lg sm:text-xl font-bold text-gray-900 mb-1.5'>
                {plan.name}
              </h3>
              <div className='flex items-baseline gap-1 mb-1'>
                <span className='text-2xl sm:text-3xl font-bold text-gray-900'>{plan.price}</span>
                {plan.name === 'Premium' && <span className='text-gray-500 text-xs sm:text-sm'>/month</span>}
              </div>
              <p className='text-[10px] sm:text-xs text-gray-500'>{plan.subtitle}</p>
            </div>

            {/* Features list */}
            <div className='p-4 sm:p-5'>
              <ul className='space-y-2 sm:space-y-2.5 mb-5'>
                {plan.features.map((feature, i) => (
                  <li key={i} className='flex items-start gap-2 sm:gap-2.5'>
                    <Check className='w-4 h-4 text-green-600 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-xs sm:text-sm leading-relaxed'>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action button */}
              <button 
                onClick={() => {
                  if (user) {
                    navigate('/ai')
                  } else {
                    openSignIn()
                  }
                }}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Plan