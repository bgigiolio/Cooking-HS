let [commentCount, setCommentCount] = useState(3)

const commentsView = chosenComment.slice(0,commentCount).map((comment, index) => {
    const rating = comment.rating;
    const reportId = 'reportIcon' + (index + 1);
    return (
        <>
            <Card>
                <CardHeader>
                    {/* link to commenter user profile here */}
                    <span className='userLink'>{comment.user}</span> says: 
                </CardHeader>
                <CardBody>
                    <div>
                        {starRating(rating)}
                    </div>
                    {comment.content}
                    <Button 
                        className='reportButton'
                        onClick={toggleReport}
                        color="danger"
                        outline
                    >
                        <i id={reportId} className="reportIcon fa-solid fa-triangle-exclamation"></i>
                    </Button>
                </CardBody>
            </Card>
        </>
    )
})