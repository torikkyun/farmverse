import { Sprout, Users, TrendingUp, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo & Title */}
          <div className="mb-12">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-black mb-8 tracking-tight">
              FARMVERSE
            </h1>
            <div className="mx-auto h-1 w-24 sm:w-32 bg-black mb-6"></div>
            <p className="text-xl sm:text-2xl text-gray-500 font-light">
              Nền tảng nông nghiệp thông minh
            </p>
          </div>

          {/* Main Message */}
          <div className="mb-16">
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-6 font-light leading-relaxed">
              Kết nối <span className="font-bold text-black">Nông dân</span> và{" "}
              <span className="font-bold text-black">Cộng đồng</span>
            </p>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Số hoá nông nghiệp Việt Nam, mang lại giá trị bền vững cho người
              sản xuất và người tiêu dùng
            </p>
          </div>

          {/* CTA Button */}
          <div className="mb-20">
            <button className="group bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 mx-auto">
              Khám phá ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Tại sao chọn FARMVERSE?
            </h2>
            <div className="h-1 w-20 bg-black mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi mang đến những giải pháp toàn diện cho nông nghiệp hiện
              đại
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <Sprout className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  Nông nghiệp thông minh
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Ứng dụng công nghệ hiện đại vào sản xuất nông nghiệp, tối ưu
                  hoá năng suất và chất lượng
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <Users className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  Kết nối cộng đồng
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Xây dựng cầu nối tin cậy giữa người nông dân và người tiêu
                  dùng, tạo giá trị cho cả hai bên
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <TrendingUp className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  Tăng thu nhập
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hỗ trợ nông dân tiếp cận thị trường rộng lớn, tăng giá trị sản
                  phẩm và thu nhập bền vững
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 border-2 border-gray-200 hover:border-black hover:shadow-lg transition-all duration-300 bg-white">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-black transition-colors">
                  <Shield className="w-8 h-8 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  An toàn thực phẩm
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Đảm bảo truy xuất nguồn gốc và chất lượng sản phẩm, mang lại
                  sự yên tâm cho người tiêu dùng
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6">
            Cùng xây dựng tương lai nông nghiệp Việt Nam
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
            Tham gia FARMVERSE để trở thành một phần của cộng đồng nông nghiệp
            thông minh, nơi mọi nỗ lực đều được ghi nhận và tạo ra giá trị thực
            sự.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 transition-colors">
              Dành cho Nông dân
            </button>
            <button className="bg-white text-black border-2 border-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors">
              Dành cho Người tiêu dùng
            </button>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-black text-white py-24">
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light italic leading-relaxed mb-10">
            Nông nghiệp không chỉ là nghề, mà là sứ mệnh nuôi dưỡng cộng đồng và
            bảo vệ tương lai
          </blockquote>
          <div className="h-px w-24 bg-white mx-auto mb-8"></div>
          <p className="text-lg sm:text-xl text-gray-300 font-light">
            Hành trình số hoá nông nghiệp Việt Nam
          </p>
        </div>
      </div>
    </div>
  );
}
