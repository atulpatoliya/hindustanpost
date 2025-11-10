import Link from 'next/link'
import { getAllArticles } from '../../lib/articles'

export default function TermsOfService() {
  // Get latest articles for sidebar
  const allArticles = getAllArticles()
  const latestArticles = allArticles.slice(0, 5)
  const popularArticles = allArticles.slice(0, 5)

  return (
    <div className="py-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-gray-600" style={{ fontSize: '15px' }}>
          <li>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-800">Terms of Service</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed" style={{ fontSize: '15px' }}>
            <div className="mb-6">
              <p className="font-medium my-2" style={{ fontSize: '15px' }}>(End User License Agreement)</p>
              <p className="font-medium my-6" style={{ fontSize: '15px' }}>TERMS OF SERVICE</p>
              <p className="font-medium" style={{ fontSize: '15px' }}>
                Before accessing or using the Services, you must agree to these Terms of Service and Hindusthan Post's Privacy Policy. By using the Services, you represent that you are age 13 or older. If you are between the ages of 13 and 17, or a minor according to laws applicable to you, you represent that your legal guardian or legal representative has reviewed and agreed to these Terms and has given you permission to access and use the Services.
              </p>
            </div>

            <div className="mb-6">
              <p className="font-medium" style={{ fontSize: '15px' }}>
                BY INSTALLING, USING OR OTHERWISE ACCESSING THE SERVICES, YOU AGREE TO THESE TERMS OF SERVICE. IF YOU DO NOT AGREE TO THESE TERMS OF SERVICES, PLEASE DO NOT INSTALL, USE OR OTHERWISE ACCESS THE SERVICES. USE OF THE SERVICES IS VOID WHERE PROHIBITED.
              </p>
            </div>

            <div className="mb-6">
              <p className="font-medium" style={{ fontSize: '15px' }}>
                <strong>Hindusthan Post</strong> reserves the right to make changes to these terms at any time. Your continued use of the Services will be deemed to confirm your acceptance of the updated terms. In addition to these Terms, you agree to abide by any supplemental policies of the Services related to Term of use and Privacy Policy defined in{' '}
                <Link href="/terms" className="text-[#C2185B] hover:underline">https://www.HindusthanPost.com/term-and-conditions/</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#C2185B] hover:underline">https://www.HindusthanPost.com/privacy-policy/</Link>
              </p>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-4" style={{ fontSize: '15px' }}>You agree that you will not, under any circumstances:</p>
              <ul className="list-disc pl-6 space-y-3 mt-4" style={{ fontSize: '15px' }}>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  use the Services for fraudulent or abusive purposes (including, without limitation, by using the Services to impersonate any person or entity, or otherwise misrepresent Hindusthan Post's affiliation with any person, entity or the Services);
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  disguise, anonymize or hide your IP address or the source of any material or content that you upload into the Services;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  interfere with or disrupt the Services, servers or networks that provide the Services;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  attempt to decompile, reverse engineer, disassemble or hack any of the Services, or to defeat or overcome any of the encryption technologies or security measures or data transmitted, processed or stored by Hindusthan Post;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  post any information that is abusive, threatening, obscene, defamatory, libellous, or racially, sexually, religiously, or otherwise objectionable or offensive or engage in ongoing toxic behaviour, such as by repeatedly posting information on an unsolicited basis;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  post any information that contains nudity, excessive violence, or offensive subject matter or that contains a link to such content;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  attempt to, or harass, abuse, or harm, or advocate or incite harassment, abuse, or harm of another person, group, including Hindusthan Post's employees, including Hindusthan Post's customer service representatives;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  solicit or attempt to solicit login information or any other login credentials or personal information from other users of the Services;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  'harvest', 'scrape', collect or post any information about or regarding other people that use the Services, including, but not limited to any personal data or information (including but not limited to 'pixel tags' cookies, graphics interchange formats ('gifs') or similar items a.k.a 'spyware' or 'pcms' (passive collection mechanisms);
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  disrupt the normal flow of a game or otherwise act in a manner that is likely to negatively affect other players' ability to compete fairly when playing the games;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  institute, assist, or become involved in any type of attack, including without limitation distribution of a virus, denial of service attacks upon the Services, or other attempts to disrupt the Services or any other person's use or enjoyment of the Services;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  disobey any requirements or regulations of any network connected to the Services;
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  circumvent technological measures designed to control access to, or elements of, the Services; or
                </li>
                <li className="font-medium" style={{ fontSize: '15px' }}>
                  do anything else that Hindusthan Post's deems not to be within the spirit of fair play or intent of the Services.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <p className="font-medium" style={{ fontSize: '15px' }}>
                You acknowledge and agree that you are solely responsible for your actions in the Services and actions made in the Services using your player account. You also acknowledge Hindusthan post reserves the right to change terms of service and privacy policy at any given point of time.
              </p>
            </div>

            {/* WhatsApp Community Button */}
            <div className="mt-8 mb-8">
              <a
                href="https://api.whatsapp.com/send/?phone=+918591196397&text=I+am+interested+to+join+your+community.+How+can+i+join%3F&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#20BA5A] transition-colors"
                style={{
                  fontSize: '15px',
                  backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjQ3MiAxNC4zODJjLS4yOTctLjE0OS0xLjc1OC0uODY3LTIuMDMtLjk2Ny0uMjczLS4wOTktLjQ3MS0uMTQ4LS42Ny4xNS0uMTk3LjI5Ny0uNzY3Ljk2Ni0uOTQgMS4xNjQtLjE3My4xOTktLjM0Ny4yMjMtLjY0NC4wNzUtLjI5Ny0uMTUtMS4yNTUtLjQ2My0yLjM5LTEuNDc1LS44ODMtLjc4OC0xLjQ4LTEuNzYxLTEuNjUzLTIuMDU5LS4xNzMtLjI5Ny0uMDE4LS40NTguMTMtLjYwNi4xMzQtLjEzMy4yOTgtLjM0Ny40NDYtLjUyLjE0OS0uMTc0LjE5OC0uMjk4LjI5OC0uNDk3LjA5OS0uMTk4LjA1LS4zNzEtLjAyNS0uNTItLjA3NS0uMTQ5LS42NjktMS42MTItLjkxNi0yLjIwNy0uMjQyLS41NzktLjQ4Ny0uNS0uNjY5LS41MS0uMTczLS4wMDgtLjM3MS0uMDEtLjU3LS4wMS0uMTk4IDAtLjUyLjA3NC0uNzkyLjM3Mi0uMjcyLjI5Ny0xLjA0IDEuMDE2LTEuMDQgMi40NzkgMCAxLjQ2MiAxLjA2NSAyLjg3NSAxLjIxMyAzLjA3NC4xNDkuMTk4IDIuMDk2IDMuMiA1LjA3NyA0LjQ4Ny43MDkuMzA2IDEuMjYyLjQ4OSAxLjY5NC42MjUuNzEyLjIyNyAxLjM2LjE5NSAxLjg3MS4xMTguNTcxLS4wODUgMS43NTgtLjcxOSAyLjAwNi0xLjQxMy4yNDgtLjY5NC4yNDgtMS4yODkuMTczLTEuNDEzLS4wNzQtLjEyNC0uMjcyLS4xOTgtLjU3LS4zNDdtLTUuNDIxIDcuNDAzaC0uMDA0YTkuODcgOS44NyAwIDAxLTUuMDMxLTEuMzc4bC0uMzYxLS4yMTQtMy43NDEuOTgyLjk5OC0zLjY0OGwtLjIzNS0uMzc0YTkuODYgOS44NiAwIDAxLTEuNTEtNS4yNmMuMDAxLTUuNDUgNC40MzYtOS44ODQgOS44ODgtOS44ODQgMi42NCAwIDUuMTIyIDEuMDMgNi45ODggMi44OThhOS44MjUgOS44MjUgMCAwMTIuODkzIDYuOTk0Yy0uMDAzIDUuNDUtNC40MzcgOS44ODQtOS44ODUgOS44ODRtOC40MTMtMTguMjk3QTExLjgxNSAxMS44MTUgMCAwMDEyLjA1IDBDNS40OTUgMCAuMTYgNS4zMzUuMTU3IDExLjg5MmMwIDIuMDk2LjU0NyA0LjE0MiAxLjU4OCA1Ljk0NUwuMDU3IDI0bDYuMzA1LTEuNjU0YTExLjg4MiAxMS44ODIgMCAwMDUuNjgzIDEuNDQ4aC4wMDVjNi41NTQgMCAxMS44OS01LjMzNSAxMS44OTMtMTEuODkzYTExLjgyMSAxMS44MjEgMCAwMC0zLjQ4LTguNDEzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+')",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '1.5em center',
                  backgroundSize: '1.6em',
                  paddingLeft: '3.5em'
                }}
              >
                Join Our WhatsApp Community
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 mb-8 border border-gray-300 rounded-lg bg-white p-4">
              <h6 className="text-center font-medium text-gray-900 mb-2" style={{ fontSize: '15px' }}>Get The Latest News!</h6>
              <h6 className="text-center text-gray-700 mb-4" style={{ fontSize: '15px' }}>
                Don't miss our top stories and need-to-know news everyday in your inbox.
              </h6>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  style={{ fontSize: '15px' }}
                />
                <button
                  type="submit"
                  className="w-full bg-[#ed7f1a] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#d66f15] transition-colors"
                  style={{ fontSize: '15px' }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          {/* Latest News Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="font-medium text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]" style={{ fontSize: '15px' }}>
              Latest News
            </h2>
            <div className="space-y-4">
              {latestArticles.map((item) => (
                <Link 
                  key={item.slug} 
                  href={`/articles/${item.slug}`}
                  className="group block pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors leading-snug mb-1" style={{ fontSize: '15px' }}>
                    {item.title}
                  </h3>
                  <div className="text-gray-500" style={{ fontSize: '15px' }}>{item.publishedAt}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="font-medium text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]" style={{ fontSize: '15px' }}>
              Popular
            </h2>
            <div className="space-y-4">
              {popularArticles.map((item) => (
                <Link 
                  key={item.slug} 
                  href={`/articles/${item.slug}`}
                  className="group block pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors leading-snug mb-1" style={{ fontSize: '15px' }}>
                    {item.title}
                  </h3>
                  <div className="text-gray-500" style={{ fontSize: '15px' }}>{item.publishedAt}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

