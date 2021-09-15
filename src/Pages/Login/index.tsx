import { useHistory, Link as ReachLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "../../Providers/Auth";
import jwtDecode, { JwtPayload } from "jwt-decode";
import api from "../../Services/api";

import {
  useMediaQuery,
  Box,
  Button,
  FormControl,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";

import LogoLogin from "../../Assets/img/img_login.png";
import { Flex, Stack } from "@chakra-ui/layout";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Input } from "../../Components/Form/Input";

import NavBar from "../../Components/NavBar";
import NavMobile from "../../Components/NavMobile";

const Login = () => {
  interface ILogin {
    username: string;
    password: string;
  }

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Preenchimento obrigatório!")
      .email("Email inválido!"),
    password: yup
      .string()
      .required("Preenchimento obrigatório!")
      .min(8, "No mínimo 8 caracteres!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { setAuth } = useAuth();
  const history = useHistory();

  const toast = useToast();

  const addSuccessToast = () => {
    toast({
      description: "",
      duration: 5000,
      position: "top",
      status: "success",
      title: "Login realizado com sucesso!",
    });
  };

  const addFailToast = () => {
    toast({
      description: "Verifique os dados preenchidos!",
      duration: 5000,
      position: "top",
      status: "error",
      title: "Falha no login!",
    });
  };

  const submitFunction = (data: ILogin) => {
    api
      .post("login/", data)
      .then((response) => {
        const { accessToken } = response.data;
        const decoded = jwtDecode<JwtPayload>(accessToken);
        setAuth(accessToken);
        window.localStorage.clear();
        window.localStorage.setItem(
          "@movies: token",
          JSON.stringify(accessToken)
        );
        addSuccessToast();
        history.push("/dashboard", { user: decoded.sub });
      })
      .catch((_) => {
        addFailToast();
      });
  };

  const [mobileVersion] = useMediaQuery("(max-width: 500px)");
  const [desktopVersion] = useMediaQuery("(min-width:768px)");

  return (
    <Box
      align="center"
      bg="#000"
      bgImage={`url(${LogoLogin})`}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="contain"
    >
      {mobileVersion ? <NavMobile /> : <NavBar />}

      <Flex
        align="center"
        bg="rgba(0, 0, 0, 0.4)"
        direction="column"
        height="100vh"
        paddingTop="10%"
      >
        {mobileVersion ? (
          <Box>
            <form onSubmit={handleSubmit(submitFunction)}>
              <FormControl
                align="center"
                borderBottom="4px solid white"
                padding="1.5rem 4rem"
              >
                <Stack spacing="4">
                  <Input
                    error={errors.email}
                    icon={MdEmail}
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                  <Input
                    error={errors.password}
                    icon={FaLock}
                    placeholder="Senha"
                    type="password"
                    {...register("password")}
                  />
                </Stack>
                <Button
                  bg="red.500"
                  color="white"
                  mt="5"
                  type="submit"
                  _hover={{ bg: "red.500" }}
                >
                  Logar
                </Button>
              </FormControl>
            </form>
            <Box marginTop="3.5">
              <Stack spacing="3.5">
                <Flex align="center" color="white" direction="column">
                  <Text as="span" align="center">
                    Já tem cadastro? Então vamos ao{" "}
                    <Link as={ReachLink} to="/signup">
                      Cadastro
                    </Link>
                  </Text>
                  <Link as={ReachLink} to="/">
                    Voltar para a página principal
                  </Link>
                </Flex>
              </Stack>
            </Box>
          </Box>
        ) : (
          <Box>
            <form onSubmit={handleSubmit(submitFunction)}>
              <FormControl
                align="center"
                borderBottom="4px solid white"
                padding="1.5rem 4rem"
              >
                <Stack spacing="4">
                  <Input
                    error={errors.email}
                    icon={MdEmail}
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  />
                  <Input
                    error={errors.password}
                    icon={FaLock}
                    placeholder="Senha"
                    type="password"
                    {...register("password")}
                  />
                </Stack>
                <Button
                  bg="red.500"
                  color="white"
                  mt="5"
                  type="submit"
                  _hover={{ bg: "red.500" }}
                >
                  Logar
                </Button>
              </FormControl>
            </form>
            <Box marginTop="3.5">
              <Stack spacing="3.5">
                <Flex align="center" color="white" direction="column">
                  <Text as="span" align="center">
                    Já tem cadastro? Então vamos ao{" "}
                    <Link as={ReachLink} to="/signup">
                      Cadastro
                    </Link>
                  </Text>
                  <Link as={ReachLink} to="/">
                    Voltar para a página principal
                  </Link>
                </Flex>
              </Stack>
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Login;
