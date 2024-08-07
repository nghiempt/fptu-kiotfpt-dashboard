import { Button, Icon, Label } from "semantic-ui-react"

const TablePrivacyPolicy = () => {

    const directToGoogleDocs = () => {
        window.open('https://docs.google.com/document/d/1v9-1rwz3f34_kI8t73WROTdB4Dg3UmvS6WoeJw5fn00/edit', '_blank')
    }

    return (
        <div className='flex justify-center items-start gap-4'>
            <Button as='div' labelPosition='left'>
                <Label as='a' basic>
                    Edit in Google Docs
                </Label>
                <Button icon onClick={directToGoogleDocs} color="blue">
                    <Icon name='linkify' />
                </Button>
            </Button>
        </div>
    )
}

export default TablePrivacyPolicy