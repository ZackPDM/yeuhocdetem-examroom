{ pkgs }: {
  deps = [
    pkgs.nodejs_18
    pkgs.nodePackages.npm
  ];

  env = {
    REPLIT_NOPROXY = "example.com";
    REPLIT_POETRY_PYTHON = "3.10";
  };
}
