import { useState } from 'react'
import api from '../api' // Assuming this is your axios instance
import './App.css'

function App() {
  
  const[formData, setFormData] = useState({
    toEmail: '',
    detail: '',
    tone: 'Professional'
  })

  const [generatedEmail, setGeneratedEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  async function generateEmail(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/generate-email/', formData);
      setGeneratedEmail(response.data);
    } catch (error) {
      console.error("Error generating email", error);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(event) {
    const value = event.target.value
    setFormData({
      ...formData,
      [event.target.name]: value
    })
  }

  return (
    <div className='bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-cyan-500 selection:text-black relative overflow-hidden'>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className='relative z-10 flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-wider'>
          Ronith-AI-MailGen
        </h1>
        <nav className='flex flex-row gap-8 text-sm font-medium text-slate-400'>
          <a href='#' className='hover:text-cyan-400 transition-colors'>Home</a>
          <a href='#' className='hover:text-cyan-400 transition-colors'>About</a>
          <a href='#' className='hover:text-cyan-400 transition-colors'>Contacts</a>
          <a href='#' className='hover:text-cyan-400 transition-colors'>Logout</a>
        </nav>
      </div>

      <div className='relative z-10 flex justify-center items-center p-4 min-h-[calc(100vh-100px)]'>

        <div className='bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>

          <div className='flex flex-col justify-center'>
            <form onSubmit={generateEmail} className='space-y-6'>

              <div className='group'>
                <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">To Email</label>
                <div className='relative'>
                  <input 
                    type='email' 
                    name='toEmail' 
                    value={formData.toEmail} 
                    onChange={handleInputChange} 
                    placeholder='recipient@example.com'
                    className='w-full bg-slate-950/50 border border-slate-700 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600'
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Detail</label>
                <textarea 
                  name='detail' 
                  rows={6}
                  value={formData.detail} 
                  onChange={handleInputChange} 
                  placeholder='Enter the main points you want to cover in the email...'
                  className='w-full bg-slate-950/50 border border-slate-700 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600 resize-none'
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">Tone</label>
                <div className='relative'>
                  <select 
                    name='tone' 
                    value={formData.tone} 
                    onChange={handleInputChange} 
                    className='w-full appearance-none bg-slate-950/50 border border-slate-700 text-slate-100 px-4 py-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer'
                  >
                    <option value="Professional">Professional</option>
                    <option value="Friendly">Friendly</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Persuasive">Persuasive</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-cyan-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <button 
                type='submit' 
                disabled={loading}
                className='w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] hover:scale-[1.02] transition-all duration-300 mt-4 border border-cyan-400/30'
              >
                {loading ? 'Generating...' : 'GENERATE EMAIL'}
              </button>
            </form>
          </div>

          <div className='bg-slate-950/80 border border-slate-800 rounded-xl p-6 relative flex flex-col h-full min-h-[400px] shadow-inner'>

            <div className='flex justify-between items-center mb-4 border-b border-slate-800 pb-2'>
              <h3 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Generated Email Preview</h3>
              <button className='text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors'>
                <span className='material-icons text-sm'></span> Copy
              </button>
            </div>

            <div className='flex-grow overflow-auto'>
              {generatedEmail ? (
                <div className='animate-fade-in'>
                  <div className='mb-4'>
                    <span className='text-slate-500 text-sm font-semibold'>Subject: </span>
                    <span className='text-slate-200 text-sm font-medium'>{generatedEmail.subject || "No Subject"}</span>
                  </div>
                  <pre className='text-slate-300 text-sm font-light whitespace-pre-wrap font-sans leading-relaxed'>
                    {generatedEmail.content}
                  </pre>
                </div>
              ) : (
                <div className='h-full flex flex-col justify-center items-center text-slate-600 space-y-2 opacity-50'>
                   <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   <p>Enter details and click generate</p>
                </div>
              )}
            </div>

            {generatedEmail && (
               <div className='mt-4 pt-4 border-t border-slate-800 flex justify-end'>
                  <button className='px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm transition-colors border border-slate-700'>
                    Send Email
                  </button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App