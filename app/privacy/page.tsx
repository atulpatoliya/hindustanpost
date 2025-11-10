import Link from 'next/link'
import { getAllArticles } from '../../lib/articles'

export default function PrivacyPolicy() {
  // Get latest articles for sidebar
  const allArticles = getAllArticles()
  const latestArticles = allArticles.slice(0, 5)
  const popularArticles = allArticles.slice(0, 5)

  return (
    <div className="py-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-800">Privacy Policy</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">

        <div className="prose prose-lg max-w-none space-y-6 text-gray-700 leading-relaxed">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Read Carefully Prior To Using This Website</h2>
            <p style={{ fontSize: '15px' }}>
              The use of this website ("Website") is conditioned upon the acceptance of the terms and conditions contained in this Privacy Statement by the visitor to the Website ("User"); this Privacy Statement is part of and incorporated by reference into the Terms of Use of the Website. By utilising the tools on this Website, User expressly agrees to this Privacy Statement. Those who do not agree to be subject to this Privacy Statement may not, under any circumstances, use this Website.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Data Collection</h2>
            <p style={{ fontSize: '15px' }}>
              We respect your privacy and consider it an important element of our business. Our privacy policy is straight forward: We do not collect personal information about you when you visit our website(s) unless you volunteer to provide that information to us except for logging and analysis. This is broadly how we handle the information we gather.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Entry by User/Update</h2>
            <p style={{ fontSize: '15px' }}>
              Certain areas of this Website will require entry by the User of certain personal information as indicated above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclosure of User Information</h2>
            <p style={{ fontSize: '15px' }}>
              Hindusthan Post will, to the extent possible, control User information, and, except as otherwise set forth herein, not disclose such User information to third parties. However, in the event disclosure of any User information by Hindusthan Post is required by law, we may disclose such User information without the consent of User.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies</h2>
            <p style={{ fontSize: '15px' }}>
              A "cookie" is a piece of data stored on User's hard drive containing information about the User. Hindusthan Post may use cookies in order to collect certain information about User, such as IP addresses (e.g., whether User is logged on from a .com, .gov, or .edu domain), domain names (the Internet address of a computer), and type of computer and operating system being used. Advertisers may use cookies when displaying their ads, these cookies may be placed on your system on this site and/or if a user clicks on an ad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third Party Sites</h2>
            <p style={{ fontSize: '15px' }}>
              The Website may from time to time include, for User's convenience, links to third party sites, which Hindusthan Post does not own or control and that are controlled by third parties. These links are for convenience only. If User utilizes third party links or moves to the third-party sites, Hindusthan Post is not responsible for the availability, content, data collection, utilisation of such information or any other aspect of such third-party sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p style={{ fontSize: '15px' }}>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <Link href="/contact" className="text-[#C2185B] hover:underline">contact@hindustanpost.com</Link>
            </p>
          </section>

          {/* WhatsApp Community Button */}
          <div className="mt-8 mb-8">
            <a
              href="https://api.whatsapp.com/send/?phone=+918591196397&text=I+am+interested+to+join+your+community.+How+can+i+join%3F&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold hover:bg-[#20BA5A] transition-colors"
              style={{
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
            <h6 className="text-center font-bold text-gray-900 mb-2" style={{ fontSize: '15px' }}>Get The Latest News!</h6>
            <h6 className="text-center text-gray-700 mb-4" style={{ fontSize: '13px' }}>
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
                className="w-full bg-[#ed7f1a] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#d66f15] transition-colors"
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
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]">
              Latest News
            </h2>
            <div className="space-y-4">
              {latestArticles.map((item) => (
                <Link 
                  key={item.slug} 
                  href={`/articles/${item.slug}`}
                  className="group block pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs text-gray-500">{item.publishedAt}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]">
              Popular
            </h2>
            <div className="space-y-4">
              {popularArticles.map((item) => (
                <Link 
                  key={item.slug} 
                  href={`/articles/${item.slug}`}
                  className="group block pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors leading-snug mb-1">
                    {item.title}
                  </h3>
                  <div className="text-xs text-gray-500">{item.publishedAt}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

