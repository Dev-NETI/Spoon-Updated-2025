const Header = ({ title }) => {
    return (
        <div className='basis-3/12'>
            <p className='text-slate-900 font-semibold text-lg ml-4 py-4 drop-shadow-sm'>
                {title}
            </p>
        </div>
    );
};

export default Header;
