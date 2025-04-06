import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyImages from "@/components/PropertyImages";
import ShareButtons from "@/components/ShareButtons";
import connectDB from "@/config/database";
import Property from "@/models/property.model";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
   // asynchronous access of `params.id`.
   const { id } = await params
  await connectDB()
  const propertyDoc = await Property.findById(id).lean()
  const property = convertToSerializeableObject(propertyDoc)
  
  

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
    <PropertyHeaderImage image={property.images[0]}/>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link href="/properties" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2"/> Back to properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="flex justify-between flex-wrap w-full gap-6">
            <div className="flex-2">
              <PropertyDetails property={property}/>
            </div>
            {/* Sidebar */}
            <aside className="space-y-4 flex-1">
              <BookmarkButton property={property}/>
              <ShareButtons property={property}/>
              <PropertyContactForm property={property}/>
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images}/>
    </>
  );
};

export default PropertyPage;
