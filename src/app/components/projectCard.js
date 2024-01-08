export default function LearningProjectCard(props) {
    const tags = props.record.fields.AllTags
    return (
        <div className="rounded-lg shadow-md p-4 bg-white">
            <h1 className="text-xl font-black mb-2">{props.record.fields.Name}</h1>
            <h1 className="text-m mb-2">{props.record.fields.Status}</h1>
            <p className="text-m mb-2">{props.record.fields.Description}</p>
            <p>tags: {props.record.fields.AllTags}</p>
            <div className="mt-4">
                {tags && tags.map((tag, index) => (
                    <span
                        key={index}
                        className="rounded-full py-1 px-3 text-white bg-blue-500 border border-blue-900 text-sm mr-2"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}