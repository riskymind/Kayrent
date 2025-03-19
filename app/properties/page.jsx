import PropertyCard from "@/components/PropertyCard"
import connectDB from "@/config/database"
import Property from "@/models/property.model"
// import properties from "@/properties.json"

const PropertiesPage = async () => {
    await connectDB()

    const properties = await Property.find({}).lean()

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Browse Properties</h1>
        {properties.length === 0 ? (
          <p>No Properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index)=> (
              <PropertyCard key={property._id} property={property}/>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default PropertiesPage
