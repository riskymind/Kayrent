"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deleteProperty from "@/app/actions/deleteProperty";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirm) return;

    const deletePropertyById = deleteProperty.bind(null, propertyId);
    await deletePropertyById();

    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );

    setProperties(updatedProperties);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-1">
      {properties.map((property) => (
        <div key={property._id} className="mb-10">
          <Link href={`/properties/${property._id}`}>
            <div className="h-[300px]">
              <Image
                className="w-full h-full rounded-md"
                src={property.images[0]}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                priority={true}
              />
            </div>
          </Link>
          <div className="mt-2">
            <p className="text-lg font-semibold text-gray-500">
              {property.name}
            </p>
            <p className="text-gray-600">
              Address: {property.location.street} {property.location.city}{" "}
              {property.location.state}
            </p>
          </div>
          <div className="mt-2">
            <Link
              href={`/properties/${property._id}/edit`}
              className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDeleteProperty(property._id)}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileProperties;
