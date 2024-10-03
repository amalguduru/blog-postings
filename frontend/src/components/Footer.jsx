const Footer = () => {
  return (
    <>
      <div className="mt-8 w-full bg-black text-gray-400 px-8 md:px-[500px] flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:justify-between text-sm md:text-md py-8">
        <div className="flex flex-col">
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
          <p>Readers Choice</p>
        </div>
        <div className="flex flex-col">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>
        <div className="flex flex-col">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms & Conditions</p>
          <p>Terms of Service</p>
        </div>
      </div>
      <div className="bg-black text-white flex md:justify-center items-center pb-8 text-sm md:text-md px-8 md:px-[500px]">
        <p>All rights reserved @Amal Guduru 2023</p>
      </div>
    </>
  );
};

export default Footer;
