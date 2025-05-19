export default function Header() {
    return (
        <header className="flex px-2 py-4 text-white">
            <div className="flex mx-auto max-w-7x1 w-full justify-between">
                <div>
                    <nav>
                        <ul className="flex items-center justify-center gap-5 pl-7">
                            <li>
                                Feitos pela Comunidade
                            </li>
                            <li>
                                Fases
                            </li>
                            <li>
                                Tutoriais
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <nav>
                        <ul className="flex items-center justify-center gap-5 pr-7">
                            <li>
                                Pesquisa
                            </li>
                            <li>
                                Login
                            </li>
                            <li>
                                Sobre nós
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
  }