interface BanksProps {
  title?: string;
}

export const Banks = ({ title = 'Main bank' }: BanksProps) => {
  const banks = [
    {
      name: 'BBVA',
      icon: 'https://1000marcas.net/wp-content/uploads/2019/12/BBVA-logo.png',
    },
    {
      name: 'Banamex',
      icon: 'https://1000marcas.net/wp-content/uploads/2020/10/Citibanamex-logo-1280x609.png',
    },
    {
      name: 'HSBC',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/HSBC_logo_%282018%29.svg',
    },
    {
      name: 'Nu',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Nubank_logo_2021.svg/528px-Nubank_logo_2021.svg.png',
    },
  ];

  return (
    <>
      <h1 className="text-center font-bold text-2xl mb-4">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {banks.map((bank) => (
          <div
            key={bank.name}
            className="flex flex-col items-center bg-white rounded-lg border shadow-md p-4"
          >
            <img src={bank.icon} alt={bank.name} className="w-16 h-16" />
            <span className="mt-2 text-lg font-semibold">{bank.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};
