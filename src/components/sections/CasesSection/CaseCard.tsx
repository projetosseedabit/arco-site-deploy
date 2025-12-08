import Image from "next/image";
import { Badge } from "../../ui/Badge";
import { Case } from "./type";

interface CaseCardProps {
  case: Case;
}

export default function CaseCard({ case: caseItem }: CaseCardProps) {
  return (
    <div 
      className="bg-gray-50 rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={caseItem.image}
          alt={caseItem.title}
          layout="fill"
          objectFit="cover"
        />
        <div 
          className="absolute top-4 left-4 px-4 py-2 rounded-full text-white text-sm font-semibold"
          style={{ backgroundColor: caseItem.categoryColor }}
        >
          {caseItem.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{caseItem.title}</h3>
        <p className="text-gray-600 mb-4">{caseItem.description}</p>
        <div className="flex flex-wrap gap-2">
          {caseItem.tags.map((tag) => (
            <Badge key={tag} className="bg-[#F0F0F0] text-[#737B8C] rounded-lg border border-gray-200">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
