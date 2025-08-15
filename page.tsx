
import { Layout } from '@/components/Layout';

export default function Resources() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support & Resources
          </h1>
          <p className="text-xl text-gray-600">
            Mental health support and philosophical guidance
          </p>
        </div>

        {/* Crisis Support */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-800 mb-3">
            🚨 If You're in Crisis
          </h2>
          <div className="space-y-2 text-red-700">
            <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
            <p><strong>International:</strong> <a href="https://findahelpline.com" className="underline">findahelpline.com</a></p>
          </div>
        </div>

        {/* Mortality Anxiety Support */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Understanding Mortality Anxiety</h2>
          <p className="text-gray-700 mb-4">
            It's completely normal to feel anxious when confronting mortality. This awareness, 
            while uncomfortable, can be transformed into a powerful motivator for meaningful living.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">Healthy Coping Strategies:</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>• <strong>Mindfulness:</strong> Focus on the present moment rather than future uncertainties</li>
            <li>• <strong>Meaning-making:</strong> Identify what gives your life purpose and direction</li>
            <li>• <strong>Connection:</strong> Strengthen relationships with loved ones</li>
            <li>• <strong>Legacy thinking:</strong> Consider the positive impact you want to leave</li>
            <li>• <strong>Professional help:</strong> Speak with a therapist if anxiety becomes overwhelming</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">Professional Support:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Psychology Today:</strong> <a href="https://psychologytoday.com" className="text-blue-600 underline">Find a therapist near you</a></li>
            <li>• <strong>BetterHelp:</strong> <a href="https://betterhelp.com" className="text-blue-600 underline">Online therapy platform</a></li>
            <li>• <strong>NAMI:</strong> <a href="https://nami.org" className="text-blue-600 underline">National Alliance on Mental Illness</a></li>
          </ul>
        </div>

        {/* Philosophical Resources */}
        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Philosophical Perspectives on Mortality</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stoicism</h3>
              <p className="text-gray-700 mb-2">
                Ancient philosophy emphasizing acceptance of mortality as natural and focusing on what we can control.
              </p>
              <p className="text-sm text-gray-600">
                Recommended: "Meditations" by Marcus Aurelius, "Letters" by Seneca
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Existentialism</h3>
              <p className="text-gray-700 mb-2">
                Philosophy exploring how awareness of mortality can lead to authentic, meaningful living.
              </p>
              <p className="text-sm text-gray-600">
                Recommended: "Being and Time" by Heidegger, "The Myth of Sisyphus" by Camus
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Buddhist Perspective</h3>
              <p className="text-gray-700 mb-2">
                Teaching impermanence as fundamental to existence and path to reducing suffering.
              </p>
              <p className="text-sm text-gray-600">
                Recommended: "When Things Fall Apart" by Pema Chödrön
              </p>
            </div>
          </div>
        </div>

        {/* Practical Applications */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
          
          <h3 className="text-lg font-semibold mb-3">Daily Practices:</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>• <strong>Morning reflection:</strong> "How do I want to spend today meaningfully?"</li>
            <li>• <strong>Evening review:</strong> "What did I do today that aligned with my values?"</li>
            <li>• <strong>Gratitude practice:</strong> Appreciate the gift of another day</li>
            <li>• <strong>Priority clarification:</strong> Focus on what truly matters</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">Life Planning:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Create a personal mission statement</li>
            <li>• Identify your core values and live by them</li>
            <li>• Build meaningful relationships</li>
            <li>• Contribute to something larger than yourself</li>
            <li>• Take care of your physical and mental health</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
