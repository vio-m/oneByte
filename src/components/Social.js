import SocialMediaButtons from 'react-social-media-buttons';

const Social = () => {
    const links = [
        'https://www.facebook.com/facebook',
        'https://twitter.com/Twitter',
        'https://www.instagram.com/instagram/',
        'https://www.linkedin.com/company/linkedin/'
    ];

    const buttonStyle = {
        width: '33px',
        height: '33px',
        margin: '0px 50px',
        backgroundColor: '#000000',
        border: '0px solid #f57900'};

    const iconStyle = { color: '#ffffff' };

    return (
        <div>
            <SocialMediaButtons links={links} buttonStyle={buttonStyle} iconStyle={iconStyle}/>
        </div>
    );
};

export default Social;

