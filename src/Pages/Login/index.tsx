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
  useDisclosure,
} from "@chakra-ui/react";

import LogoLogin from "../../Assets/img/img login.png";
import { Flex, Stack } from "@chakra-ui/layout";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import { Input } from "../../Components/Form/Input";
import { ModalSuccess } from "../../Components/ModalResults/ModalSuccess";
import { ModalFail } from "../../Components/ModalResults/ModalFail";

import { useLogin } from "../../Providers/Login";
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

  // const { signIn } = useLogin();
  const { setAuth } = useAuth();
  const history = useHistory();

  const submitFunction = (data: ILogin) => {
    console.log(data);
    // signIn(data);
    api
      .post("/login/", data)
      .then((response) => {
        const { accessToken } = response.data;
        const decoded = jwtDecode<JwtPayload>(accessToken);
        setAuth(accessToken);
        window.localStorage.clear();
        window.localStorage.setItem(
          "@movies: token",
          JSON.stringify(accessToken)
        );
        onModalSuccessOpen();
        console.log("Login realizado com sucesso! Prosseguir");
        history.push("/dashboard", { user: decoded.sub });
      })
      .catch((_) => {
        onModalFailOpen();
        console.log("Falha no login! Verifique os dados informados");
      });
  };

  const {
    isOpen: inModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const {
    isOpen: inModalFailOpen,
    onOpen: onModalFailOpen,
    onClose: onModalFailClose,
  } = useDisclosure();

  const [mobileVersion] = useMediaQuery("(max-width: 768px)");
  const [desktopVersion] = useMediaQuery("(min-width:768px)");

  return (
    <>
      <ModalSuccess isOpen={inModalSuccessOpen} onClose={onModalSuccessClose} />
      <ModalFail isOpen={inModalFailOpen} onClose={onModalFailClose} />

      {mobileVersion ? <NavMobile /> : <NavBar />}

      <Flex align="center" bg="#000" direction="column" height="100vh">
        <form onSubmit={handleSubmit(submitFunction)}>
          {mobileVersion ? (
            <Box bgImage={LogoLogin}>
              <FormControl
                align="center"
                borderBottom="4px solid white"
                padding="1.5rem 4rem"
              >
                <Stack spacing="5">
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
                <Button bg="#F00" color="white" margin-top="10" type="submit">
                  Registrar
                </Button>
              </FormControl>
            </Box>
          ) : (
            <Box bgImage={LogoLogin}>
              <FormControl
                align="center"
                borderBottom="4px solid white"
                padding="3.5rem 10rem"
              >
                <Stack spacing="7">
                  <Input
                    error={errors.email}
                    icon={MdEmail}
                    placeholder="Email"
                    {...register("email")}
                  />
                  <Input
                    error={errors.password}
                    icon={FaLock}
                    placeholder="Senha"
                    {...register("password")}
                  />
                </Stack>
                <Button bg="#F00" color="white" margin-top="2" type="submit">
                  Registrar
                </Button>
              </FormControl>
            </Box>
          )}
        </form>
        <Box marginTop="3.5">
          <Stack spacing="3.5">
            <Flex align="center" color="white" direction="column">
              <Text>
                Ainda não tem cadastro? Então vamos ao{" "}
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
      </Flex>
    </>
  );
};

export default Login;
