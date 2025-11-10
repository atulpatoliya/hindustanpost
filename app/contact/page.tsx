import Link from 'next/link'

export default function ContactUs() {
  return (
    <div className="py-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-gray-600" style={{ fontSize: '15px' }}>
          <li>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-800">Contact Us</li>
        </ol>
      </nav>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-medium text-gray-900 mb-10 text-center" style={{ fontSize: '30px', lineHeight: '38px' }}>
          Contact Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Contact Information - Left Column (5/12) */}
          <div className="lg:col-span-5">
            <div className="space-y-4" style={{ fontSize: '15px', lineHeight: '1.5' }}>
              <h3 className="font-medium mb-4" style={{ fontSize: '15px' }}>
                Address :&nbsp; &nbsp;
              </h3>
              <h3 className="font-medium mb-4" style={{ fontSize: '24px', lineHeight: '32px' }}>
                Hindusthan Post&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                Swatantryaveer Savarkar Rashtriya Smarak, 
                Swatantryaveer Savarkar Marg, Shivaji Park,
                Dadar&nbsp; West, Mumbai, Maharashtra 400028
              </h3>
              <p className="font-medium mb-4" style={{ fontSize: '15px' }}>
                Phone nos: <a href="tel:+9102224459197" className="text-[#C2185B] hover:underline">+91 – 022-2445 9197</a>
              </p>
              <h3 className="font-medium mb-2" style={{ fontSize: '15px' }}>
                Email : <a href="mailto:hindusthanpostnews@gmail.com" className="text-[#C2185B] hover:underline">hindusthanpostnews@gmail.com</a>
              </h3>
            </div>
          </div>

          {/* Google Map - Right Column (7/12) */}
          <div className="lg:col-span-7">
            <div className="w-full h-[450px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d898.2913627642266!2d72.83630938010597!3d19.028288402260028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfee97bfe34f%3A0x511806627f6c1834!2sHindusthan%20Post!5e0!3m2!1sen!2sin!4v1602495146231!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hindusthan Post Location"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Community Button */}
        <div className="mt-8 mb-8 text-center">
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
        <div className="mt-8 mb-8 border border-gray-300 rounded-lg bg-white p-4 max-w-2xl mx-auto">
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
  )
}
